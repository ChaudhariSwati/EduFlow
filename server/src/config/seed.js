import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import Assignment from '../models/Assignment.js'

export async function seedDatabase() {
  const userCount = await User.countDocuments()
  if (userCount > 0) {
    return
  }

  const password = async (value) => bcrypt.hash(value, 10)

  const users = await User.create([
    { name: 'Prof. Sharma', email: 'prof@joineazy.com', password: await password('admin123'), role: 'admin' },
    { name: 'Prof. Mehta', email: 'mehta@joineazy.com', password: await password('admin123'), role: 'admin' },
    { name: 'Riya Patel', email: 'riya@student.com', password: await password('stu123'), role: 'student' },
    { name: 'Arjun Nair', email: 'arjun@student.com', password: await password('stu123'), role: 'student' },
    { name: 'Sneha Roy', email: 'sneha@student.com', password: await password('stu123'), role: 'student' },
  ])

  const [admin1, admin2, stu1, stu2, stu3] = users
  const studentIds = [stu1, stu2, stu3].map((user) => user._id.toString())

  await Assignment.create([
    {
      title: 'React Hooks Deep Dive',
      description: 'Build a custom hook that manages form state with validation. Submit your GitHub link.',
      driveLink: 'https://drive.google.com/drive/folders/example1',
      dueDate: '2026-03-30',
      createdBy: admin1._id,
      submissions: Object.fromEntries(studentIds.map((id) => [id, id !== stu2._id.toString()])),
    },
    {
      title: 'Tailwind CSS Landing Page',
      description: 'Design a responsive landing page using only Tailwind CSS. Mobile-first approach required.',
      driveLink: 'https://drive.google.com/drive/folders/example2',
      dueDate: '2026-04-05',
      createdBy: admin1._id,
      submissions: Object.fromEntries(studentIds.map((id) => [id, false])),
    },
    {
      title: 'API Integration Project',
      description: 'Integrate a public REST API and display data with loading/error states.',
      driveLink: 'https://drive.google.com/drive/folders/example3',
      dueDate: '2026-04-10',
      createdBy: admin2._id,
      submissions: Object.fromEntries(studentIds.map((id) => [id, id !== stu3._id.toString()])),
    },
  ])
}