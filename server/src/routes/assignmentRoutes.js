import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import Assignment from '../models/Assignment.js'
import User from '../models/User.js'
import { protect, requireRole } from '../middleware/auth.js'
import { serializeAssignment } from '../utils/serialize.js'

const router = Router()

function validate(req, res) {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    res.status(400).json({ error: result.array()[0].msg })
    return false
  }
  return true
}

router.get('/', protect, async (_req, res) => {
  const assignments = await Assignment.find().sort({ createdAt: -1 })
  res.json({ assignments: assignments.map(serializeAssignment) })
})

router.post(
  '/',
  protect,
  requireRole('admin'),
  [
    body('title').trim().isLength({ min: 3 }).withMessage('Title is required.'),
    body('dueDate').isISO8601().withMessage('A valid due date is required.'),
  ],
  async (req, res) => {
    if (!validate(req, res)) return

    const students = await User.find({ role: 'student' }).select('_id')
    const submissions = Object.fromEntries(students.map((student) => [student._id.toString(), false]))

    const assignment = await Assignment.create({
      title: req.body.title,
      description: req.body.description || '',
      driveLink: req.body.driveLink || '',
      dueDate: req.body.dueDate,
      createdBy: req.user.id,
      submissions,
    })

    res.status(201).json({ assignment: serializeAssignment(assignment) })
  }
)

router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  const assignment = await Assignment.findById(req.params.id)

  if (!assignment) {
    return res.status(404).json({ error: 'Assignment not found.' })
  }

  if (assignment.createdBy.toString() !== req.user.id) {
    return res.status(403).json({ error: 'You can only delete assignments you created.' })
  }

  await assignment.deleteOne()
  res.json({ success: true })
})

async function submitAssignment(req, res) {
  const { assignmentId } = req.body
  const assignment = await Assignment.findById(assignmentId)

  if (!assignment) {
    return res.status(404).json({ error: 'Assignment not found.' })
  }

  assignment.submissions.set(req.user.id, true)
  await assignment.save()

  res.json({ assignment: serializeAssignment(assignment) })
}

router.post('/submissions', protect, requireRole('student'), submitAssignment)
router.post('/submit', protect, requireRole('student'), submitAssignment)

export default router