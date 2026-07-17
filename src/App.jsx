import React from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Login from './components/Login'
import StudentDashboard from './components/StudentDashboard'
import AdminDashboard from './components/AdminDashboard'

function AppContent() {
  const { currentUser, authLoading } = useApp()

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 px-6 py-5 shadow-2xl">
          Loading EduFlow...
        </div>
      </div>
    )
  }

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