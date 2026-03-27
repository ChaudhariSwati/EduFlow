import React from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Login from './components/Login'
import StudentDashboard from './components/StudentDashboard'
import AdminDashboard from './components/AdminDashboard'

function AppContent() {
  const { currentUser } = useApp()

  if (!currentUser) return <Login />
  
  return currentUser.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />
}

export default function App() {
  return (
    <AppProvider>
      <div className="fade-in">
        <AppContent />
      </div>
    </AppProvider>
  )
}