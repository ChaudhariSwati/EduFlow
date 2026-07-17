import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import assignmentRoutes from './routes/assignmentRoutes.js'
import studentRoutes from './routes/studentRoutes.js'
import aiRoutes from './routes/aiRoutes.js'

const app = express()

const allowedOrigins = (process.env.CORS_ORIGIN || process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRoutes)
app.use('/api/assignments', assignmentRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/ai', aiRoutes)

app.use((error, _req, res, _next) => {
  res.status(500).json({ error: error.message || 'Internal server error' })
})

export default app