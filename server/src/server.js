import dotenv from 'dotenv'
import app from './app.js'
import { connectDB } from './config/db.js'
import { seedDatabase } from './config/seed.js'

dotenv.config()

const port = process.env.PORT || 4000

async function start() {
  await connectDB(process.env.MONGODB_URI)
  await seedDatabase()

  app.listen(port, () => {
    console.log(`EduFlow API running on http://localhost:${port}`)
  })
}

start().catch((error) => {
  console.error('Failed to start the API server')
  console.error(error)
  process.exit(1)
})