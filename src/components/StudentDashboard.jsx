import React from 'react'
import { useApp } from '../context/AppContext'
import Navbar from './Navbar'
import AssignmentCard from './AssignmentCard'

export default function StudentDashboard() {
  const { currentUser, assignments } = useApp()
  const total = assignments.length
  const submitted = assignments.filter(a => a.submissions[currentUser.id]).length
  const pct = total > 0 ? Math.round((submitted / total) * 100) : 0

  return (
    <div style={{minHeight:'100vh'}}>
      <Navbar />
      <div style={{maxWidth:'900px', margin:'0 auto', padding:'32px 16px'}}>
        <div style={{marginBottom:'32px', animation:'fadeIn 0.4s ease'}}>
          <h1 style={{fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'28px', color:'white', margin:'0 0 6px'}}>Hello, {currentUser.name.split(' ')[0]} 👋</h1>
          <p style={{color:'#A7A5B8', fontSize:'14px', margin:0}}>Here's your assignment overview</p>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px', marginBottom:'24px', animation:'fadeIn 0.4s ease'}}>
          {[{label:'Total',value:total,color:'white'},{label:'Submitted',value:submitted,color:'#4ade80'},{label:'Pending',value:total-submitted,color:'#fbbf24'}].map(s=>(
            <div key={s.label} style={{background:'rgba(34,31,53,0.7)',backdropFilter:'blur(12px)',border:'1px solid rgba(108,99,255,0.15)',borderRadius:'16px',padding:'18px',textAlign:'center'}}>
              <div style={{fontFamily:'Syne,sans-serif',fontWeight:900,fontSize:'28px',color:s.color}}>{s.value}</div>
              <div style={{color:'#A7A5B8',fontSize:'12px',marginTop:'4px'}}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{background:'rgba(34,31,53,0.7)',backdropFilter:'blur(12px)',border:'1px solid rgba(108,99,255,0.15)',borderRadius:'16px',padding:'20px',marginBottom:'28px',animation:'fadeIn 0.4s ease'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
            <span style={{fontFamily:'Syne,sans-serif',fontWeight:600,color:'white',fontSize:'14px'}}>Overall Progress</span>
            <span style={{color:'#6C63FF',fontWeight:700,fontSize:'14px'}}>{pct}%</span>
          </div>
          <div style={{background:'rgba(255,255,255,0.06)',borderRadius:'99px',height:'10px'}}>
            <div style={{background:'linear-gradient(90deg,#6C63FF,#FF6584)',borderRadius:'99px',height:'10px',width:`${pct}%`,transition:'width 0.8s cubic-bezier(0.4,0,0.2,1)'}} />
          </div>
          <p style={{color:'#A7A5B8',fontSize:'12px',marginTop:'8px',marginBottom:0}}>{submitted} of {total} assignments submitted</p>
        </div>

        <h2 style={{fontFamily:'Syne,sans-serif',fontWeight:700,color:'white',fontSize:'18px',marginBottom:'16px'}}>Assignments</h2>
        {assignments.length === 0
          ? <div style={{background:'rgba(34,31,53,0.5)',borderRadius:'16px',padding:'48px',textAlign:'center',color:'#A7A5B8'}}>No assignments yet.</div>
          : <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'16px'}}>
              {assignments.map(a => <AssignmentCard key={a.id} assignment={a} />)}
            </div>
        }
      </div>
    </div>
  )
}