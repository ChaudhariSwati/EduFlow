import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import Navbar from './Navbar'
import AssignmentCard from './AssignmentCard'
import CreateAssignmentModal from './CreateAssignmentModal'

export default function AdminDashboard() {
  const { currentUser, assignments, deleteAssignment, students } = useApp()
  const [showCreate, setShowCreate] = useState(false)
  const [filter, setFilter] = useState('mine')

  const myAssignments = assignments.filter(a => a.createdBy === currentUser.id)
  const displayList = filter === 'mine' ? myAssignments : assignments
  const totalSubs = myAssignments.reduce((acc,a) => acc + Object.values(a.submissions).filter(Boolean).length, 0)
  const totalPossible = myAssignments.length * students.length

  const btnStyle = (active) => ({
    padding:'6px 16px', borderRadius:'99px', fontSize:'12px', fontWeight:600, cursor:'pointer', border: active ? 'none' : '1px solid rgba(255,255,255,0.1)',
    background: active ? '#6C63FF' : 'rgba(255,255,255,0.04)', color: active ? 'white' : '#A7A5B8', fontFamily:'DM Sans,sans-serif'
  })

  return (
    <div style={{minHeight:'100vh'}}>
      <Navbar />
      <div style={{maxWidth:'1100px', margin:'0 auto', padding:'32px 16px'}}>
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'flex-start',gap:'16px',marginBottom:'32px',animation:'fadeIn 0.4s ease'}}>
          <div>
            <h1 style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'28px',color:'white',margin:'0 0 6px'}}>Admin Dashboard</h1>
            <p style={{color:'#A7A5B8',fontSize:'14px',margin:0}}>Manage assignments & track submissions</p>
          </div>
          <button onClick={()=>setShowCreate(true)}
            style={{display:'flex',alignItems:'center',gap:'8px',padding:'11px 22px',borderRadius:'12px',background:'#6C63FF',border:'none',color:'white',fontWeight:600,fontSize:'14px',cursor:'pointer',boxShadow:'0 4px 16px rgba(108,99,255,0.3)',fontFamily:'DM Sans,sans-serif'}}>
            + New Assignment
          </button>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'12px',marginBottom:'28px',animation:'fadeIn 0.4s ease'}}
          className="sm:grid-cols-4">
          {[
            {label:'My Assignments', value:myAssignments.length, color:'white'},
            {label:'Students', value:students.length, color:'#6C63FF'},
            {label:'Submissions', value:totalSubs, color:'#4ade80'},
            {label:'Pending', value:Math.max(0,totalPossible-totalSubs), color:'#fbbf24'},
          ].map(s => (
            <div key={s.label} style={{background:'rgba(34,31,53,0.7)',backdropFilter:'blur(12px)',border:'1px solid rgba(108,99,255,0.15)',borderRadius:'16px',padding:'18px',textAlign:'center'}}>
              <div style={{fontFamily:'Syne,sans-serif',fontWeight:900,fontSize:'26px',color:s.color}}>{s.value}</div>
              <div style={{color:'#A7A5B8',fontSize:'12px',marginTop:'4px'}}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{display:'flex',gap:'8px',marginBottom:'20px'}}>
          <button onClick={()=>setFilter('mine')} style={btnStyle(filter==='mine')}>My Assignments</button>
          <button onClick={()=>setFilter('all')} style={btnStyle(filter==='all')}>All Assignments</button>
        </div>

        {displayList.length === 0
          ? <div style={{background:'rgba(34,31,53,0.5)',borderRadius:'16px',padding:'48px',textAlign:'center',color:'#A7A5B8'}}>
              No assignments yet. <button onClick={()=>setShowCreate(true)} style={{background:'none',border:'none',color:'#6C63FF',cursor:'pointer',textDecoration:'underline',fontSize:'14px'}}>Create one</button>
            </div>
          : <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'16px'}}>
              {displayList.map(a => (
                <AssignmentCard key={a.id} assignment={a}
                  showDelete={a.createdBy === currentUser.id}
                  onDelete={()=>deleteAssignment(a.id)} />
              ))}
            </div>
        }
      </div>
      {showCreate && <CreateAssignmentModal onClose={()=>setShowCreate(false)} />}
    </div>
  )
}