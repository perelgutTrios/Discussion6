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
    <main className="container mt-5" style={{ maxWidth: 400 }}>
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">{isRegister ? 'Register' : 'Login'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input name="email" id="email" type="email" className="form-control" placeholder="Email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input name="password" id="password" type="password" className="form-control" placeholder="Password" value={form.password} onChange={handleChange} required />
            </div>
            {isRegister && (
              <>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input name="name" id="name" className="form-control" placeholder="Name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone (10 digits)</label>
                  <input name="phone" id="phone" className="form-control" placeholder="Phone (10 digits)" value={form.phone} onChange={handleChange} required />
                </div>
              </>
            )}
            <button className="btn btn-primary w-100 mb-2" type="submit">{isRegister ? 'Register' : 'Login'}</button>
          </form>
          <button className="btn btn-link w-100" onClick={handleToggleMode}>
            {isRegister ? 'Already have an account? Login' : 'No account? Register'}
          </button>
          {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
        </div>
      </div>
    </main>
  );
}

export default Auth;
