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
    <main>
  <button className="btn-submit" onClick={goBack}>Back to Subjects</button>
      <h2 className="section-header">{subject.title}</h2>
  <div style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap', maxWidth: 600 }}><strong>Description:</strong> {subject.description}</div>
      <div><strong>Author:</strong> {subject.userId?.name || subject.userId?.email || 'Unknown'}</div>
      <div><strong>Created:</strong> {new Date(subject.timestamp).toLocaleString()}</div>
      <h3 style={{ color: '#174ea6' }}>Comments</h3>
      <button className={showCommentForm ? "btn-cancel" : "btn-add"} onClick={() => setShowCommentForm(f => !f)}>{showCommentForm ? 'Cancel' : 'Add Comment'}</button>
      {showCommentForm && (
        <form onSubmit={handleAddComment}>
          <textarea value={commentText} onChange={e => setCommentText(e.target.value)} maxLength={1000} required placeholder="Comment (max 1000 chars)" />
          <button className="btn-submit" type="submit">Submit</button>
        </form>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
  <CommentList comments={comments} token={token} />
    </main>
  );
}

export default SubjectDetail;
