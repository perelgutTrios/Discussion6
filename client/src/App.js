import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Auth from './components/Auth';
import SubjectList from './components/SubjectList';
import SubjectDetail from './components/SubjectDetail';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    if (token) {
      axios.get('/api/subjects', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setSubjects(res.data))
        .catch(() => setSubjects([]));
    }
  }, [token]);

  if (!token) {
    return <Auth setToken={setToken} setUser={setUser} />;
  }

  if (selectedSubject) {
    return <SubjectDetail subject={selectedSubject} token={token} user={user} goBack={() => setSelectedSubject(null)} />;
  }

  return <SubjectList subjects={subjects} setSelectedSubject={setSelectedSubject} token={token} setSubjects={setSubjects} user={user} setToken={setToken} />;
}

export default App;
