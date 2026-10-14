import React, { useState } from 'react';
import axios from 'axios';

export default function LoginModal({ isOpen, isStandalone, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    if (isRegister) {
      // 1. REGISTER FLOW
      try {
        await axios.post('http://localhost:5000/api/auth/register', formData);
        setLoading(false);
        setSuccessMsg('Registration successful! Please login to continue.');
        setIsRegister(false); // Switch to Login view automatically
        setFormData({ name: '', email: formData.email, password: '' }); // Keep email populated
      } catch (err) {
        setLoading(false);
        setError(err.response?.data?.message || 'Registration failed');
      }
    } else {
      // 2. LOGIN FLOW
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password
        });
        setLoading(false);
        onLoginSuccess(res.data); // Login click par hi Home Page open hoga
      } catch (err) {
        setLoading(false);
        setError(err.response?.data?.message || 'Invalid login credentials');
      }
    }
  };

  const formContent = (
    <div className="glass-modal">
      <h2 style={{ marginBottom: '18px', textAlign: 'center' }}>
        {isRegister ? 'Create Account' : 'Account Login'}
      </h2>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #f87171', color: '#f87171', padding: '10px', borderRadius: '10px', marginBottom: '14px', fontSize: '0.85rem', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {successMsg && (
        <div style={{ background: 'rgba(52, 211, 153, 0.2)', border: '1px solid #34d399', color: '#34d399', padding: '10px', borderRadius: '10px', marginBottom: '14px', fontSize: '0.85rem', textAlign: 'center' }}>
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div>
            <label style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Full Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Laxmi Dhangar"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        )}
        <div>
          <label style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Email Address</label>
          <input
            type="email"
            className="form-input"
            placeholder="name@example.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="••••••••"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '10px' }}>
          {loading ? 'Please wait...' : (isRegister ? 'Register Account' : 'Login to Store')}
        </button>
      </form>

      <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.85rem', color: '#cbd5e1' }}>
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <span
          onClick={() => {
            setError('');
            setSuccessMsg('');
            setIsRegister(!isRegister);
          }}
          style={{ color: '#a855f7', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {isRegister ? 'Login Here' : 'Register Here'}
        </span>
      </p>
    </div>
  );

  if (isStandalone) {
    return formContent;
  }

  return (
    <div className="modal-overlay">
      {formContent}
    </div>
  );
}