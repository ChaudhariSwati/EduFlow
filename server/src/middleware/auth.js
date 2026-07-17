import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { serializeUser } from '../utils/serialize.js'

export async function protect(req, res, next) {
  try {
    const token = req.cookies.eduflow_token || (req.headers.authorization || '').replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ error: 'Authentication required.' })
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const userId = payload.sub
    const user = await User.findById(userId)

    if (!user) {
      return res.status(401).json({ error: 'Session expired.' })
    }

    req.user = serializeUser(user)
    req.userDoc = user
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token.' })
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden.' })
    }
    next()
  }
}