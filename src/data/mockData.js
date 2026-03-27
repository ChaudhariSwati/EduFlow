export const USERS = [
  { id: 'admin1', name: 'Prof. Sharma', email: 'prof@joineazy.com', password: 'admin123', role: 'admin' },
  { id: 'admin2', name: 'Prof. Mehta',  email: 'mehta@joineazy.com', password: 'admin123', role: 'admin' },
  { id: 'stu1',   name: 'Riya Patel',   email: 'riya@student.com',   password: 'stu123',   role: 'student' },
  { id: 'stu2',   name: 'Arjun Nair',   email: 'arjun@student.com',  password: 'stu123',   role: 'student' },
  { id: 'stu3',   name: 'Sneha Roy',    email: 'sneha@student.com',  password: 'stu123',   role: 'student' },
]

export const INITIAL_ASSIGNMENTS = [
  {
    id: 'a1',
    title: 'React Hooks Deep Dive',
    description: 'Build a custom hook that manages form state with validation. Submit your GitHub link.',
    driveLink: 'https://drive.google.com/drive/folders/example1',
    dueDate: '2026-03-30',
    createdBy: 'admin1',
    submissions: { stu1: true, stu2: false, stu3: true }
  },
  {
    id: 'a2',
    title: 'Tailwind CSS Landing Page',
    description: 'Design a responsive landing page using only Tailwind CSS. Mobile-first approach required.',
    driveLink: 'https://drive.google.com/drive/folders/example2',
    dueDate: '2026-04-05',
    createdBy: 'admin1',
    submissions: { stu1: false, stu2: false, stu3: false }
  },
  {
    id: 'a3',
    title: 'API Integration Project',
    description: 'Integrate a public REST API and display data with loading/error states.',
    driveLink: 'https://drive.google.com/drive/folders/example3',
    dueDate: '2026-04-10',
    createdBy: 'admin2',
    submissions: { stu1: true, stu2: true, stu3: false }
  },
]