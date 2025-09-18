import React, { useState } from 'react';
import axios from 'axios';

function CommentList({ comments, token }) {
  const [selected, setSelected] = useState(null);
  const [fullComment, setFullComment] = useState(null);

  const handleSelect = async (comment) => {
    setSelected(comment._id);
    try {
      const res = await axios.get(`/api/comments/${comment._id}`, { headers: { Authorization: `Bearer ${token}` } });
      setFullComment(res.data);
    } catch {
      setFullComment(null);
    }
  };

  if (selected && fullComment) {
    return (
      <div className="card card-body mb-3">
        <div style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap', maxWidth: 600 }}><strong>Comment:</strong> {fullComment.text}</div>
        <div><strong>By:</strong> {fullComment.userId?.name || fullComment.userId?.email || 'Unknown'}</div>
        <div><strong>At:</strong> {new Date(fullComment.timestamp).toLocaleString()}</div>
        <button className="btn btn-outline-secondary mt-2" onClick={() => { setSelected(null); setFullComment(null); }}>Back to Comments</button>
      </div>
    );
  }

  return (
    <ul className="list-group" style={{ maxHeight: 300, overflowY: 'auto', padding: 0 }}>
      {comments.map(c => (
        <li key={c._id} className="list-group-item list-group-item-action" style={{ cursor: 'pointer' }} onClick={() => handleSelect(c)}>
          <div style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap', maxWidth: 600 }}><strong>{c.text}</strong></div>
          <div style={{ fontSize: '0.9em', color: '#555' }}>
            By: {c.userId?.name || c.userId?.email || 'Unknown'} | {c.timestamp ? new Date(c.timestamp).toLocaleString() : ''}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
