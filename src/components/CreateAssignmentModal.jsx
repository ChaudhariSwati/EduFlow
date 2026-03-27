import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function CreateAssignmentModal({ onClose }) {
  const { createAssignment } = useApp()
  const [form, setForm] = useState({ title:'', description:'', driveLink:'', dueDate:'' })
  const [error, setError] = useState('')
  const handle = e => setForm(f => ({...f, [e.target.name]: e.target.value}))

  const submit = e => {
    e.preventDefault()
    if (!form.title || !form.dueDate) return setError('Title and Due Date are required.')
    createAssignment(form)
    onClose()
  }

  const inputStyle = {width:'100%', background:'rgba(15,14,23,0.8)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'12px', padding:'10px 14px', color:'white', fontSize:'13px', outline:'none', fontFamily:'DM Sans,sans-serif', boxSizing:'border-box'}
  const labelStyle = {display:'block', fontSize:'12px', fontWeight:500, color:'#A7A5B8', marginBottom:'6px'}

  return (
    <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'center',justifyContent:'center',padding:'16px',background:'rgba(0,0,0,0.6)',backdropFilter:'blur(6px)'}} onClick={onClose}>
      <div style={{background:'rgba(34,31,53,0.97)',border:'1px solid rgba(108,99,255,0.2)',borderRadius:'20px',padding:'28px',width:'100%',maxWidth:'480px',animation:'fadeIn 0.3s ease'}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
          <h3 style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'18px',color:'white',margin:0}}>New Assignment</h3>
          <button onClick={onClose} style={{background:'none',border:'none',color:'#A7A5B8',fontSize:'22px',cursor:'pointer',lineHeight:1}}>×</button>
        </div>

        <form onSubmit={submit}>
          <div style={{marginBottom:'16px'}}><label style={labelStyle}>Title *</label><input name="title" value={form.title} onChange={handle} placeholder="e.g. React Hooks Assignment" style={inputStyle} required /></div>
          <div style={{marginBottom:'16px'}}><label style={labelStyle}>Description</label><textarea name="description" value={form.description} onChange={handle} rows={3} placeholder="Assignment instructions..." style={{...inputStyle, resize:'none'}} /></div>
          <div style={{marginBottom:'16px'}}><label style={labelStyle}>Google Drive Link</label><input name="driveLink" value={form.driveLink} onChange={handle} placeholder="https://drive.google.com/..." style={inputStyle} /></div>
          <div style={{marginBottom:'20px'}}><label style={labelStyle}>Due Date *</label><input name="dueDate" type="date" value={form.dueDate} onChange={handle} style={inputStyle} required /></div>

          {error && <p style={{color:'#f87171',fontSize:'13px',marginBottom:'12px'}}>{error}</p>}

          <div style={{display:'flex',gap:'10px'}}>
            <button type="button" onClick={onClose} style={{flex:1,padding:'11px',borderRadius:'12px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',color:'#A7A5B8',cursor:'pointer',fontSize:'13px',fontWeight:600,fontFamily:'DM Sans,sans-serif'}}>Cancel</button>
            <button type="submit" style={{flex:1,padding:'11px',borderRadius:'12px',background:'#6C63FF',border:'none',color:'white',cursor:'pointer',fontSize:'13px',fontWeight:600,fontFamily:'DM Sans,sans-serif'}}>Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}