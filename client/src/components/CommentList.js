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
      <div style={{ border: '1px solid #aaa', padding: '1rem', margin: '1rem 0' }}>
        <div><strong>Comment:</strong> {fullComment.text}</div>
        <div><strong>By:</strong> {fullComment.userId?.name || fullComment.userId?.email || 'Unknown'}</div>
        <div><strong>At:</strong> {new Date(fullComment.timestamp).toLocaleString()}</div>
        <button onClick={() => { setSelected(null); setFullComment(null); }}>Back to Comments</button>
      </div>
    );
  }

  return (
    <ul style={{ maxHeight: 300, overflowY: 'auto', padding: 0 }}>
      {comments.map(c => (
        <li key={c._id} style={{ borderBottom: '1px solid #ccc', padding: '0.5rem', cursor: 'pointer' }} onClick={() => handleSelect(c)}>
          <div><strong>{c.text}</strong></div>
          <div style={{ fontSize: '0.9em', color: '#555' }}>
            By: {c.userId?.name || c.userId?.email || 'Unknown'} | {c.timestamp ? new Date(c.timestamp).toLocaleString() : ''}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
