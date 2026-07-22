import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AppContext = createContext()

const API_BASE = import.meta.env.VITE_API_URL ?? ''

async function request(path, options = {}) {
  let response

  try {
    response = await fetch(`${API_BASE}${path}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    })
  } catch {
    throw new Error('API unreachable. Start the backend server on port 4000.')
  }

  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json') ? await response.json() : null
  const textPayload = contentType.includes('application/json') ? '' : (await response.text()).trim()

  if (!response.ok) {
    throw new Error(payload?.error || payload?.message || textPayload || `Request failed (${response.status})`)
  }

  return payload
}

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    return null
  })
  const [assignments, setAssignments] = useState([])
  const [students, setStudents] = useState([])
  const [authLoading, setAuthLoading] = useState(true)
  const [apiError, setApiError] = useState('')

  const refreshAssignments = async () => {
    const [assignmentData, studentData] = await Promise.all([
      request('/api/assignments'),
      request('/api/students').catch(() => ({ students: [] })),
    ])

    setAssignments(assignmentData.assignments || [])
    setStudents(studentData.students || [])
  }

  const refreshSession = async () => {
    setAuthLoading(true)
    setApiError('')

    try {
      const session = await request('/api/auth/me')
      setCurrentUser(session.user)
      await refreshAssignments()
    } catch {
      setCurrentUser(null)
      setAssignments([])
      setStudents([])
    } finally {
      setAuthLoading(false)
    }
  }

  useEffect(() => {
    refreshSession()
  }, [])

  const login = async (email, password) => {
    try {
      const payload = await request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      setCurrentUser(payload.user)
      await refreshAssignments()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (newUser) => {
    try {
      const payload = await request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(newUser),
      })

      setCurrentUser(payload.user)
      await refreshAssignments()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const googleLogin = async (credential) => {
    try {
      const payload = await request('/api/auth/google', {
        method: 'POST',
        body: JSON.stringify({ credential }),
      })

      setCurrentUser(payload.user)
      await refreshAssignments()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const resetPassword = async (email, newPassword) => {
    try {
      await request('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email, newPassword }),
      })

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    try {
      await request('/api/auth/logout', { method: 'POST' })
    } finally {
      setCurrentUser(null)
      setAssignments([])
      setStudents([])
    }
  }

  const submitAssignment = async (assignmentId) => {
    await request('/api/assignments/submit', {
      method: 'POST',
      body: JSON.stringify({ assignmentId }),
    })
    await refreshAssignments()
  }

  const createAssignment = async (data) => {
    await request('/api/assignments', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    await refreshAssignments()
  }

  const generateAssignmentDraft = async ({ topic, dueDate }) => {
    return request('/api/ai/assignment-draft', {
      method: 'POST',
      body: JSON.stringify({ topic, dueDate }),
    })
  }

  const deleteAssignment = async (id) => {
    await request(`/api/assignments/${id}`, { method: 'DELETE' })
    await refreshAssignments()
  }

  const value = useMemo(() => ({
    currentUser,
    students,
    assignments,
    authLoading,
    apiError,
    login,
    googleLogin,
    register,
    logout,
    resetPassword,
    submitAssignment,
    createAssignment,
    generateAssignmentDraft,
    deleteAssignment,
  }), [currentUser, students, assignments, authLoading, apiError])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)