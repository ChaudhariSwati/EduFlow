import React, { useState } from 'react'

export default function ConfirmSubmitModal({ assignment, onConfirm, onClose }) {
  const [step, setStep] = useState(1)

  const overlayStyle = {position:'fixed', inset:0, zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', background:'rgba(0,0,0,0.6)', backdropFilter:'blur(6px)', animation:'fadeIn 0.2s ease'}
  const boxStyle = {background:'rgba(34,31,53,0.95)', border:'1px solid rgba(108,99,255,0.2)', borderRadius:'20px', padding:'28px', width:'100%', maxWidth:'360px', animation:'fadeIn 0.3s ease'}
  const btnBase = {flex:1, padding:'11px', borderRadius:'12px', fontSize:'13px', fontWeight:600, cursor:'pointer', border:'none', fontFamily:'DM Sans,sans-serif'}

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={boxStyle} onClick={e=>e.stopPropagation()}>
        {step === 1 ? (
          <>
            <div style={{width:'48px',height:'48px',borderRadius:'14px',background:'rgba(108,99,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',fontSize:'24px'}}>📤</div>
            <h3 style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'18px',color:'white',textAlign:'center',margin:'0 0 8px'}}>Mark as Submitted?</h3>
            <p style={{color:'#A7A5B8',fontSize:'13px',textAlign:'center',margin:'0 0 24px'}}>
              Have you submitted <strong style={{color:'white'}}>"{assignment.title}"</strong>?
            </p>
            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={onClose} style={{...btnBase, background:'rgba(255,255,255,0.05)', color:'#A7A5B8'}}>Cancel</button>
              <button onClick={()=>setStep(2)} style={{...btnBase, background:'#6C63FF', color:'white'}}>Yes, I have</button>
            </div>
          </>
        ) : (
          <>
            <div style={{width:'48px',height:'48px',borderRadius:'14px',background:'rgba(234,179,8,0.2)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',fontSize:'24px'}}>⚠️</div>
            <h3 style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'18px',color:'white',textAlign:'center',margin:'0 0 8px'}}>Final Confirmation</h3>
            <p style={{color:'#A7A5B8',fontSize:'13px',textAlign:'center',margin:'0 0 24px'}}>
              This cannot be undone. Make sure your work is uploaded via the Drive link.
            </p>
            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={()=>setStep(1)} style={{...btnBase, background:'rgba(255,255,255,0.05)', color:'#A7A5B8'}}>Go Back</button>
              <button onClick={onConfirm} style={{...btnBase, background:'#22c55e', color:'white'}}>Confirm ✓</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}