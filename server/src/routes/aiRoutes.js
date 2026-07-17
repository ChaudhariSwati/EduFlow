import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import { protect, requireRole } from '../middleware/auth.js'

const router = Router()

function validate(req, res) {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    res.status(400).json({ error: result.array()[0].msg })
    return false
  }
  return true
}

function extractJson(text) {
  const fenceMatch = text.match(/```json\s*([\s\S]*?)```/i)
  const rawJson = fenceMatch ? fenceMatch[1] : text
  return JSON.parse(rawJson)
}

router.post(
  '/assignment-draft',
  protect,
  requireRole('admin'),
  [body('topic').trim().isLength({ min: 3 }).withMessage('Topic must be at least 3 characters.')],
  async (req, res) => {
    if (!validate(req, res)) return

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'Gemini API key is not configured on the server.' })
    }

    const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash'
    const topic = req.body.topic.trim()
    const dueDate = req.body.dueDate || ''

    const prompt = [
      'Generate an academic assignment draft in JSON only.',
      'Return exactly this JSON shape: {"title":"","description":""}.',
      'The description should be practical, clear, and 4-6 sentences long.',
      `Topic: ${topic}.`,
      dueDate ? `Due date context: ${dueDate}.` : '',
      'Do not include markdown or extra keys.',
    ].filter(Boolean).join('\n')

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.4,
            topP: 0.9,
          },
        }),
      }
    )

    const payload = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({
        error: payload?.error?.message || 'Gemini request failed.',
      })
    }

    const text = payload?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) {
      return res.status(502).json({ error: 'Gemini returned an empty response.' })
    }

    try {
      const draft = extractJson(text)
      return res.json({
        title: typeof draft.title === 'string' ? draft.title.trim() : '',
        description: typeof draft.description === 'string' ? draft.description.trim() : '',
      })
    } catch {
      return res.status(502).json({ error: 'Could not parse Gemini response.' })
    }
  }
)

export default router