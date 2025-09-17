import React, { useState } from 'react';
import axios from 'axios';

function Auth({ setToken, setUser }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', name: '', phone: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await axios.post('/api/auth/register', form);
        setIsRegister(false);
      } else {
        const res = await axios.post('/api/auth/login', { email: form.email, password: form.password });
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }
    } catch (err) {
      // Always show backend error if present, else show a generic message
      const backendError = err.response?.data?.error;
      if (backendError) {
        setError(backendError);
      } else {
        setError('Authentication failed.');
      }
    }
  };

  const handleToggleMode = () => {
    setIsRegister(r => !r);
    setError('');
  };

  return (
    <main>
      <h2 className="section-header">{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        {isRegister && (
          <>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            <input name="phone" placeholder="Phone (10 digits)" value={form.phone} onChange={handleChange} required />
          </>
        )}
        <button className="btn-submit" type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <button className={isRegister ? "btn-cancel" : "btn-add"} onClick={handleToggleMode}>
        {isRegister ? 'Already have an account? Login' : 'No account? Register'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </main>
  );
}

export default Auth;
