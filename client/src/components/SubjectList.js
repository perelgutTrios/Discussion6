import React, { useState } from 'react';
import axios from 'axios';

function SubjectList({ subjects, setSelectedSubject, token, setSubjects, user, setToken }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/subjects', form, { headers: { Authorization: `Bearer ${token}` } });
      setSubjects([res.data, ...subjects]);
      setShowForm(false);
      setForm({ title: '', description: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add subject.');
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <main>
      <h2>Discussion Subjects</h2>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => setShowForm(f => !f)}>{showForm ? 'Cancel' : 'Add Subject'}</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title (max 100)" maxLength={100} value={form.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Description (max 1000)" maxLength={1000} value={form.description} onChange={handleChange} required />
          <button type="submit">Submit</button>
        </form>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul style={{ maxHeight: 400, overflowY: 'auto', padding: 0 }}>
        {subjects.map(s => (
          <li key={s._id} style={{ borderBottom: '1px solid #ccc', padding: '1rem', cursor: 'pointer' }} onClick={() => setSelectedSubject(s)}>
            <strong>{s.title}</strong> <br />
            <span>By: {s.userId?.name || s.userId?.email || 'Unknown'} | {new Date(s.timestamp).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default SubjectList;
