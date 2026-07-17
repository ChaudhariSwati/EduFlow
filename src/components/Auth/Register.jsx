import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function Register({ onSwitch }) {
  const { register } = useApp();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await register(form);
    if (!res.success) setError(res.error);
    setLoading(false);
  };

  return (
    <div className="glass p-8 rounded-2xl w-full max-w-md fade-in shadow-2xl border border-white/10">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Create Account</h2>
        <p className="text-muted text-sm">Join the eduFlow community today</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" placeholder="Full Name" required
          className="w-full bg-dark/60 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary/50 text-sm"
          onChange={e => setForm({...form, name: e.target.value})}
        />
        <input 
          type="email" placeholder="Email Address" required
          className="w-full bg-dark/60 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary/50 text-sm"
          onChange={e => setForm({...form, email: e.target.value})}
        />
        <input 
          type="password" placeholder="Password" required
          className="w-full bg-dark/60 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary/50 text-sm"
          onChange={e => setForm({...form, password: e.target.value})}
        />
        
        <div className="space-y-2">
          <label className="text-xs text-muted ml-1">I am a...</label>
          <select 
            className="w-full bg-dark/60 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary/50 text-sm"
            onChange={e => setForm({...form, role: e.target.value})}
          >
            <option value="student">Student</option>
            <option value="admin">Professor (Admin)</option>
          </select>
        </div>

        {error && <p className="text-xs text-red-400 bg-red-400/10 p-2 rounded-lg">{error}</p>}

        <button disabled={loading} className="w-full bg-primary py-3 rounded-xl text-white font-bold hover:bg-primary/80 transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-60">
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>
      
      <button 
        onClick={onSwitch} 
        className="w-full text-muted text-sm mt-6 hover:text-white transition-colors"
      >
        Already have an account? <span className="text-primary font-semibold">Sign In</span>
      </button>
    </div>
  );
}