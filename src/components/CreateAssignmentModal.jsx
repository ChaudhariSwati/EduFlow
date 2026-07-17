import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function CreateAssignmentModal({ onClose }) {
  const { createAssignment, generateAssignmentDraft } = useApp()
  const [form, setForm] = useState({ title:'', description:'', driveLink:'', dueDate:'' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const handle = e => setForm(f => ({...f, [e.target.name]: e.target.value}))

  const handleGenerateWithAi = async () => {
    setError('')
    if (!form.title || form.title.trim().length < 3) {
      setError('Enter a title/topic first to generate with Gemini.')
      return
    }

    setAiLoading(true)
    try {
      const draft = await generateAssignmentDraft({ topic: form.title, dueDate: form.dueDate })
      setForm((prev) => ({
        ...prev,
        title: draft.title || prev.title,
        description: draft.description || prev.description,
      }))
    } catch (err) {
      setError(err.message || 'Gemini generation failed.')
    } finally {
      setAiLoading(false)
    }
  }

  const submit = async e => {
    e.preventDefault()
    setError('')
    if (!form.title || !form.dueDate) return setError('Title and Due Date are required.')
    setLoading(true)
    try {
      await createAssignment(form)
      onClose()
    } catch (err) {
      setError(err.message || 'Unable to create assignment.')
    } finally {
      setLoading(false)
    }
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
          <div style={{marginBottom:'16px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'6px'}}>
              <label style={{...labelStyle, marginBottom:0}}>Description</label>
              <button
                type="button"
                onClick={handleGenerateWithAi}
                disabled={aiLoading || loading}
                style={{
                  background:'rgba(108,99,255,0.15)',
                  border:'1px solid rgba(108,99,255,0.35)',
                  color:'#c4b5fd',
                  borderRadius:'10px',
                  fontSize:'11px',
                  fontWeight:600,
                  padding:'6px 10px',
                  cursor: aiLoading || loading ? 'not-allowed' : 'pointer',
                  opacity: aiLoading || loading ? 0.6 : 1,
                }}
              >
                {aiLoading ? 'Generating...' : 'Generate with Gemini'}
              </button>
            </div>
            <textarea name="description" value={form.description} onChange={handle} rows={3} placeholder="Assignment instructions..." style={{...inputStyle, resize:'none'}} />
          </div>
          <div style={{marginBottom:'16px'}}><label style={labelStyle}>Google Drive Link</label><input name="driveLink" value={form.driveLink} onChange={handle} placeholder="https://drive.google.com/..." style={inputStyle} /></div>
          <div style={{marginBottom:'20px'}}><label style={labelStyle}>Due Date *</label><input name="dueDate" type="date" value={form.dueDate} onChange={handle} style={inputStyle} required /></div>

          {error && <p style={{color:'#f87171',fontSize:'13px',marginBottom:'12px'}}>{error}</p>}

          <div style={{display:'flex',gap:'10px'}}>
            <button type="button" onClick={onClose} style={{flex:1,padding:'11px',borderRadius:'12px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',color:'#A7A5B8',cursor:'pointer',fontSize:'13px',fontWeight:600,fontFamily:'DM Sans,sans-serif'}}>Cancel</button>
            <button type="submit" disabled={loading} style={{flex:1,padding:'11px',borderRadius:'12px',background:'#6C63FF',border:'none',color:'white',cursor:'pointer',fontSize:'13px',fontWeight:600,fontFamily:'DM Sans,sans-serif',opacity: loading ? 0.7 : 1}}>{loading ? 'Creating...' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}