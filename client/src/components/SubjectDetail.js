import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentList from './CommentList';

function SubjectDetail({ subject, token, user, goBack }) {
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');
  const [selectedComment, setSelectedComment] = useState(null);

  useEffect(() => {
    axios.get(`/api/comments/subject/${subject._id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setComments(res.data))
      .catch(() => setComments([]));
  }, [subject, token]);

  const handleAddComment = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/comments', { text: commentText, subjectId: subject._id }, { headers: { Authorization: `Bearer ${token}` } });
      setComments([...comments, { ...res.data, text: res.data.text.substring(0, 75) }]);
      setShowCommentForm(false);
      setCommentText('');
      // Refetch subjects to update comment counts
      if (window && window.location) {
        // If goBack is called, the parent App will refetch subjects
      } else if (typeof goBack === 'function') {
        goBack();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add comment.');
    }
  };

  return (
    <main className="container mt-5" style={{ maxWidth: 700 }}>
      <button className="btn btn-outline-secondary mb-3" onClick={goBack}>Back to Subjects</button>
      <div className="card mb-3">
        <div className="card-body">
          <h2 className="card-title">{subject.title}</h2>
          <div className="mb-2" style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap', maxWidth: 600 }}><strong>Description:</strong> {subject.description}</div>
          <div className="mb-2"><strong>Author:</strong> {subject.userId?.name || subject.userId?.email || 'Unknown'}</div>
          <div className="mb-2"><strong>Created:</strong> {new Date(subject.timestamp).toLocaleString()}</div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3 className="mb-0" style={{ color: '#174ea6' }}>Comments</h3>
        <button className={`btn ${showCommentForm ? 'btn-secondary' : 'btn-success'}`} onClick={() => setShowCommentForm(f => !f)}>{showCommentForm ? 'Cancel' : 'Add Comment'}</button>
      </div>
      {showCommentForm && (
        <form onSubmit={handleAddComment} className="card card-body mb-3">
          <div className="mb-3">
            <textarea className="form-control" value={commentText} onChange={e => setCommentText(e.target.value)} maxLength={1000} required placeholder="Comment (max 1000 chars)" />
          </div>
          <button className="btn btn-primary w-100" type="submit">Submit</button>
        </form>
      )}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <CommentList comments={comments} token={token} />
    </main>
  );
}

export default SubjectDetail;
