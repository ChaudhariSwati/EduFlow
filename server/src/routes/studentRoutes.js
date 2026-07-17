import { Router } from 'express'
import User from '../models/User.js'
import { protect, requireRole } from '../middleware/auth.js'
import { serializeUser } from '../utils/serialize.js'

const router = Router()

router.get('/', protect, requireRole('admin'), async (_req, res) => {
  const students = await User.find({ role: 'student' }).sort({ name: 1 })
  res.json({ students: students.map(serializeUser) })
})

export default router