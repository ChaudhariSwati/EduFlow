import React, { useState } from 'react'
import ConfirmSubmitModal from './ConfirmSubmitModal'
import { useApp } from '../context/AppContext'

export default function AssignmentCard({ assignment, showDelete, onDelete }) {
  const { currentUser, submitAssignment, students } = useApp()
  const [showModal, setShowModal] = useState(false)
  const isStudent = currentUser.role === 'student'
  const isSubmitted = isStudent ? assignment.submissions[currentUser.id] : false
  const submittedCount = Object.values(assignment.submissions).filter(Boolean).length
  const totalStudents = students.length
  const pct = totalStudents > 0 ? Math.round((submittedCount / totalStudents) * 100) : 0
  const isOverdue = new Date(assignment.dueDate) < new Date()

  const cardStyle = {background:'rgba(34,31,53,0.7)', backdropFilter:'blur(12px)', border:'1px solid rgba(108,99,255,0.15)', borderRadius:'18px', padding:'20px', display:'flex', flexDirection:'column', gap:'14px', transition:'transform 0.2s, box-shadow 0.2s', position:'relative'}

  const statusColor = isSubmitted ? {bg:'rgba(34,197,94,0.15)', text:'#4ade80'} : isOverdue ? {bg:'rgba(239,68,68,0.15)', text:'#f87171'} : {bg:'rgba(234,179,8,0.15)', text:'#fbbf24'}
  const statusLabel = isSubmitted ? '✓ Done' : isOverdue ? 'Overdue' : 'Pending'

  return (
    <>
      <div style={cardStyle}
        onMouseOver={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 8px 32px rgba(108,99,255,0.2)'}}
        onMouseOut={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>

        {showDelete && (
          <button onClick={onDelete} style={{position:'absolute',top:'12px',right:'12px',width:'28px',height:'28px',borderRadius:'8px',background:'rgba(239,68,68,0.15)',border:'none',color:'#f87171',cursor:'pointer',fontSize:'12px',display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
        )}

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'10px'}}>
          <div style={{flex:1, minWidth:0}}>
            <h3 style={{fontFamily:'Syne,sans-serif', fontWeight:700, color:'white', fontSize:'15px', margin:'0 0 4px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{assignment.title}</h3>
            <p style={{color:'#A7A5B8', fontSize:'12px', margin:0, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'}}>{assignment.description}</p>
          </div>
          {isStudent && (
            <span style={{background:statusColor.bg, color:statusColor.text, fontSize:'11px', padding:'3px 10px', borderRadius:'99px', fontWeight:600, whiteSpace:'nowrap', flexShrink:0}}>{statusLabel}</span>
          )}
        </div>

        <div style={{display:'flex', gap:'12px', flexWrap:'wrap', alignItems:'center'}}>
          <span style={{color:'#A7A5B8', fontSize:'12px'}}>📅 <span style={{color:'white'}}>{new Date(assignment.dueDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</span></span>
          {assignment.driveLink && (
            <a href={assignment.driveLink} target="_blank" rel="noopener noreferrer" style={{color:'#6C63FF', fontSize:'12px', textDecoration:'underline'}}>📁 Drive Link</a>
          )}
        </div>

        <div>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'6px'}}>
            <span style={{color:'#A7A5B8', fontSize:'12px'}}>{isStudent ? 'Class Progress' : `Submissions: ${submittedCount}/${totalStudents}`}</span>
            <span style={{color:'#6C63FF', fontSize:'12px', fontWeight:600}}>{pct}%</span>
          </div>
          <div style={{background:'rgba(255,255,255,0.06)', borderRadius:'99px', height:'6px'}}>
            <div style={{background:'linear-gradient(90deg, #6C63FF, #FF6584)', borderRadius:'99px', height:'6px', width:`${pct}%`, transition:'width 0.8s cubic-bezier(0.4,0,0.2,1)'}} />
          </div>
        </div>

        {!isStudent && (
          <div style={{display:'flex', flexDirection:'column', gap:'6px'}}>
            {students.map(s => (
              <div key={s.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'12px'}}>
                <span style={{color:'#A7A5B8'}}>{s.name}</span>
                <span style={{background: assignment.submissions[s.id] ? 'rgba(34,197,94,0.15)':'rgba(239,68,68,0.15)', color: assignment.submissions[s.id] ? '#4ade80':'#f87171', padding:'2px 8px', borderRadius:'99px', fontWeight:500}}>
                  {assignment.submissions[s.id] ? 'Submitted' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        )}

        {isStudent && !isSubmitted && (
          <button onClick={()=>setShowModal(true)}
            style={{width:'100%', padding:'10px', borderRadius:'12px', background:'rgba(108,99,255,0.1)', border:'1px solid rgba(108,99,255,0.3)', color:'#6C63FF', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:'DM Sans,sans-serif'}}>
            Mark as Submitted
          </button>
        )}
        {isStudent && isSubmitted && (
          <div style={{width:'100%', padding:'10px', borderRadius:'12px', background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.2)', color:'#4ade80', fontSize:'13px', fontWeight:600, textAlign:'center'}}>
            ✓ Submitted
          </div>
        )}
      </div>

      {showModal && <ConfirmSubmitModal assignment={assignment} onConfirm={()=>{submitAssignment(assignment.id,currentUser.id);setShowModal(false)}} onClose={()=>setShowModal(false)} />}
    </>
  )
}