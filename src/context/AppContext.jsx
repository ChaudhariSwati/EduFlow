import React, { createContext, useContext, useState, useEffect } from 'react'
import { USERS as INITIAL_USERS, INITIAL_ASSIGNMENTS } from '../data/mockData'

const AppContext = createContext()

export function AppProvider({ children }) {
  // 1. Manage Users in state so we can Register/Reset
  const [users, setUsers] = useState(() => {
    try {
      const s = localStorage.getItem('jz_users')
      return s ? JSON.parse(s) : INITIAL_USERS
    } catch { return INITIAL_USERS }
  })

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const s = localStorage.getItem('jz_user')
      return s ? JSON.parse(s) : null
    } catch { return null }
  })

  const [assignments, setAssignments] = useState(() => {
    try {
      const s = localStorage.getItem('jz_assignments')
      return s ? JSON.parse(s) : INITIAL_ASSIGNMENTS
    } catch { return INITIAL_ASSIGNMENTS }
  })

  // Sync users and assignments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('jz_users', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem('jz_assignments', JSON.stringify(assignments))
  }, [assignments])

  const login = (email, password) => {
    // CHANGE THIS: Use the 'users' state, not the static 'USERS' import
    const user = users.find(u => u.email === email && u.password === password)
    
    if (user) {
      setCurrentUser(user)
      localStorage.setItem('jz_user', JSON.stringify(user))
      return { success: true }
    }
    return { success: false, error: 'Invalid email or password.' }
  }

  const register = (newUser) => {
    if (users.find(u => u.email === newUser.email)) {
      return { success: false, error: 'User already exists.' }
    }
    const userWithId = { 
      ...newUser, 
      id: 'u' + Date.now() 
    }
    setUsers(prev => [...prev, userWithId])
    setCurrentUser(userWithId)
    localStorage.setItem('jz_user', JSON.stringify(userWithId))
    return { success: true }
  }

  const resetPassword = (email, newPassword) => {
    const userIndex = users.findIndex(u => u.email === email)
    if (userIndex === -1) return { success: false, error: 'Email not found.' }
    
    const updatedUsers = [...users]
    updatedUsers[userIndex].password = newPassword
    setUsers(updatedUsers)
    return { success: true }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('jz_user')
  }

  const submitAssignment = (assignmentId, studentId) => {
    setAssignments(prev =>
      prev.map(a => a.id === assignmentId
        ? { ...a, submissions: { ...a.submissions, [studentId]: true } }
        : a
      )
    )
  }

  const createAssignment = (data) => {
    const newA = {
      id: 'a' + Date.now(),
      ...data,
      createdBy: currentUser.id,
      // Initialize submissions for all current students
      submissions: users
        .filter(u => u.role === 'student')
        .reduce((acc, u) => ({ ...acc, [u.id]: false }), {})
    }
    setAssignments(prev => [newA, ...prev])
  }

  const deleteAssignment = (id) => setAssignments(prev => prev.filter(a => a.id !== id))

  const students = users.filter(u => u.role === 'student')

  return (
    <AppContext.Provider value={{ 
      currentUser, users, login, register, logout, resetPassword, 
      assignments, submitAssignment, createAssignment, deleteAssignment, students 
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)