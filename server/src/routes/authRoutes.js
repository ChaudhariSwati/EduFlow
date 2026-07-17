import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'node:crypto'
import { body, validationResult } from 'express-validator'
import { OAuth2Client } from 'google-auth-library'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'
import { serializeUser } from '../utils/serialize.js'

const router = Router()
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

function cookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production'
  return {
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }
}

function issueToken(userId) {
  return jwt.sign({ sub: userId.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

function validate(req, res) {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    res.status(400).json({ error: result.array()[0].msg })
    return false
  }
  return true
}

router.post(
  '/register',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name is required.'),
    body('email').isEmail().withMessage('A valid email is required.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
    body('role').optional().isIn(['student', 'admin']).withMessage('Invalid role.'),
  ],
  async (req, res) => {
    if (!validate(req, res)) return

    const { name, email, password, role = 'student' } = req.body
    const existingUser = await User.findOne({ email: email.toLowerCase() })

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashedPassword, role })

    res.cookie('eduflow_token', issueToken(user._id), cookieOptions())
    res.status(201).json({ user: serializeUser(user) })
  }
)

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('A valid email is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
  ],
  async (req, res) => {
    if (!validate(req, res)) return

    const { email, password } = req.body
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    const passwordMatch = await user.comparePassword(password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    res.cookie('eduflow_token', issueToken(user._id), cookieOptions())
    res.json({ user: serializeUser(user) })
  }
)

router.post(
  '/google',
  [body('credential').notEmpty().withMessage('Google credential is required.')],
  async (req, res) => {
    if (!validate(req, res)) return

    if (!process.env.GOOGLE_CLIENT_ID) {
      return res.status(500).json({ error: 'Google auth is not configured on the server.' })
    }

    const { credential } = req.body

    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      })

      const payload = ticket.getPayload()
      if (!payload?.email || !payload.email_verified) {
        return res.status(401).json({ error: 'Google account email is not verified.' })
      }

      let user = await User.findOne({ email: payload.email.toLowerCase() })

      if (!user) {
        const generatedPassword = await bcrypt.hash(randomUUID(), 10)
        user = await User.create({
          name: payload.name || payload.email.split('@')[0],
          email: payload.email.toLowerCase(),
          password: generatedPassword,
          role: 'student',
        })
      }

      res.cookie('eduflow_token', issueToken(user._id), cookieOptions())
      return res.json({ user: serializeUser(user) })
    } catch {
      return res.status(401).json({ error: 'Invalid Google token.' })
    }
  }
)

router.get('/me', protect, async (req, res) => {
  res.json({ user: req.user })
})

router.post('/logout', (_req, res) => {
  res.clearCookie('eduflow_token', { path: '/' })
  res.json({ success: true })
})

router.post(
  '/reset-password',
  [
    body('email').isEmail().withMessage('A valid email is required.'),
    body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
  ],
  async (req, res) => {
    if (!validate(req, res)) return

    const { email, newPassword } = req.body
    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      return res.status(404).json({ error: 'Email not found.' })
    }

    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()
    res.json({ success: true })
  }
)

export default router