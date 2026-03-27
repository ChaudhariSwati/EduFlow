import React from 'react'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const { currentUser, logout } = useApp()
  return (
    <nav style={{background:'rgba(34,31,53,0.85)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(108,99,255,0.2)'}}
      className="sticky top-0 z-50 px-4 sm:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div style={{background:'#6C63FF'}} className="w-8 h-8 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">EduFlow</span>
        </div>
        <span className="font-bold text-lg text-white" style={{fontFamily:'Syne,sans-serif'}}></span>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-medium text-white">{currentUser.name}</span>
          <span className="text-xs capitalize" style={{color:'#A7A5B8'}}>{currentUser.role}</span>
        </div>
        <div style={{background:'rgba(108,99,255,0.2)', border:'1px solid rgba(108,99,255,0.4)', color:'#6C63FF'}}
          className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm">
          {currentUser.name[0]}
        </div>
        <button onClick={logout} style={{color:'#A7A5B8'}}
          className="ml-1 px-3 py-1.5 rounded-lg text-xs font-medium hover:text-white transition-colors"
          onMouseOver={e=>e.target.style.background='rgba(255,255,255,0.1)'}
          onMouseOut={e=>e.target.style.background='transparent'}>
          Logout
        </button>
      </div>
    </nav>
  )
}