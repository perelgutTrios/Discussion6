const express = require('express');
const Subject = require('../models/Subject');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Get all subjects
router.get('/', authenticateToken, async (req, res) => {
  try {
    const subjects = await Subject.find().populate('userId', 'email name').sort({ timestamp: -1 });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subjects.' });
  }
});

// Add a new subject
router.post('/', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }
  try {
    const subject = new Subject({
      title,
      description,
      userId: req.user.userId
    });
    await subject.save();
    res.status(201).json(subject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create subject.' });
  }
});

// Get a single subject by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id).populate('userId', 'email name');
    if (!subject) return res.status(404).json({ error: 'Subject not found.' });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subject.' });
  }
});

module.exports = router;
