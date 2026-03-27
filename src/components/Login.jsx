import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import Register from './Auth/Register'
import ForgotPassword from './Auth/ForgotPassword'

// Fixed background to prevent input re-focus freezing
const AuthBackground = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#0f172a]">
    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />
    {children}
  </div>
)

export default function Login() {
  const { login } = useApp()
  const [view, setView] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const result = login(email, password)
    if (!result.success) setError(result.error)
    setLoading(false)
  }

  // Quick Demo Login Function
  const handleDemo = (type) => {
    const creds = type === 'admin' 
      ? { e: 'prof@joineazy.com', p: 'admin123' } 
      : { e: 'riya@student.com', p: 'stu123' };
    
    setEmail(creds.e);
    setPassword(creds.p);
    // Visual feedback then login
    setLoading(true);
    setTimeout(() => {
      login(creds.e, creds.p);
      setLoading(false);
    }, 500);
  }

  if (view === 'register') return <AuthBackground><Register onSwitch={() => setView('login')} /></AuthBackground>
  if (view === 'forgot') return <AuthBackground><ForgotPassword onSwitch={() => setView('login')} /></AuthBackground>

  return (
    <AuthBackground>
      <div className="w-full max-w-[440px] animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-xl shadow-blue-500/20">
            <span className="text-white font-bold text-2xl">E</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-50 tracking-tight">EduFlow</h1>
          <p className="text-slate-400 mt-2 text-sm">Sign in to your EduFlow account</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 ml-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                placeholder="email@eduflow.com"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-medium text-slate-400">Password</label>
                <button type="button" onClick={() => setView('forgot')} className="text-[10px] text-blue-400 hover:underline">Forgot Password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-[10px] font-bold"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Country + Phone Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 ml-1">Phone Number</label>
              <div className="flex gap-2">
                <select 
                  value={countryCode} 
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-24 bg-slate-950/50 border border-slate-800 rounded-xl px-2 py-3 text-slate-200 text-xs focus:outline-none"
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="Phone Number"
                  className="flex-1 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                />
              </div>
            </div>

            {error && <div className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 py-2 px-3 rounded-lg">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
            >
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </form>

          {/* Create Account Link */}
          <div className="mt-6 text-center pt-5 border-t border-slate-800">
            <p className="text-slate-400 text-xs">
              New to EduFlow? <button onClick={() => setView('register')} className="text-blue-400 font-semibold hover:underline">Create Account</button>
            </p>
          </div>

          {/* RE-ADDED: Professional Demo Buttons */}
          <div className="mt-5 space-y-2">
            <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest font-bold">Quick Demo Access</p>
            <div className="flex gap-2">
              <button 
                onClick={() => handleDemo('admin')} 
                className="flex-1 bg-slate-800/50 hover:bg-slate-800 text-slate-300 text-[10px] py-2.5 rounded-lg border border-slate-700 transition-all font-medium"
              >
                👨‍🏫 PROFESSOR
              </button>
              <button 
                onClick={() => handleDemo('student')} 
                className="flex-1 bg-slate-800/50 hover:bg-slate-800 text-slate-300 text-[10px] py-2.5 rounded-lg border border-slate-700 transition-all font-medium"
              >
                👩‍🎓 STUDENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthBackground>
  )
}