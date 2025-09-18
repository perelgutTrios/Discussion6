import React, { useState } from 'react';
import axios from 'axios';

function SubjectList({ subjects, setSelectedSubject, token, setSubjects, user, setToken }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });
  const [error, setError] = useState('');

  // Debug: log subjects to inspect userId structure
  React.useEffect(() => {
    if (subjects && subjects.length > 0) {
      console.log('Subjects received:', subjects);
    }
  }, [subjects]);

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
    <main className="container mt-5" style={{ maxWidth: 700 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Discussion Subjects</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
      </div>
      <button className={`btn ${showForm ? 'btn-secondary' : 'btn-success'} mb-3`} onClick={() => setShowForm(f => !f)}>
        {showForm ? 'Cancel' : 'Add Subject'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="card card-body mb-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input name="title" id="title" className="form-control" placeholder="Title (max 100)" maxLength={100} value={form.title} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea name="description" id="description" className="form-control" placeholder="Description (max 1000)" maxLength={1000} value={form.description} onChange={handleChange} required />
          </div>
          <button className="btn btn-primary w-100" type="submit">Submit</button>
        </form>
      )}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <ul className="list-group" style={{ maxHeight: 400, overflowY: 'auto', padding: 0 }}>
        {subjects.map(s => (
          <li key={s._id} className="list-group-item list-group-item-action" style={{ cursor: 'pointer' }} onClick={() => setSelectedSubject(s)}>
            <strong>{s.title}</strong> <br />
            <span className="text-muted" style={{ fontSize: '0.95em' }}>
              By: {s.userId?.name || s.userId?.email || 'Unknown'} | {new Date(s.timestamp).toLocaleString()} | Comments: {typeof s.commentCount === 'number' ? s.commentCount : 0}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default SubjectList;
