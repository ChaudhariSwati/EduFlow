import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function ForgotPassword({ onSwitch }) {
  const { resetPassword } = useApp();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' }); // Fixed from setError
    
    if (newPassword !== confirmPassword) {
      return setMessage({ type: 'error', text: 'Passwords do not match.' });
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const res = resetPassword(email, newPassword);
    
    if (res.success) {
      setMessage({ type: 'success', text: 'Password updated! Redirecting...' });
      setTimeout(onSwitch, 2000); 
    } else {
      setMessage({ type: 'error', text: res.error });
    }
    setLoading(false);
  };

  return (
    <div className="glass p-8 rounded-2xl w-full max-w-md fade-in shadow-2xl border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Reset Password</h2>
      <form onSubmit={handleReset} className="space-y-4">
        <input type="email" placeholder="Email" required className="w-full bg-dark/60 border border-white/10 p-3 rounded-xl text-white" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="New Password" required className="w-full bg-dark/60 border border-white/10 p-3 rounded-xl text-white" onChange={e => setNewPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" required className="w-full bg-dark/60 border border-white/10 p-3 rounded-xl text-white" onChange={e => setConfirmPassword(e.target.value)} />
        {message.text && <p className="text-xs text-center text-primary">{message.text}</p>}
        <button disabled={loading} className="w-full bg-primary py-3 rounded-xl text-white font-bold">{loading ? 'Saving...' : 'Update'}</button>
      </form>
      <button onClick={onSwitch} className="w-full text-muted text-sm mt-4">Back to Login</button>
    </div>
  );
}