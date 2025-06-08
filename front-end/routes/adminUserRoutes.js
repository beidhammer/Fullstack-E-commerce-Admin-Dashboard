const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const API_URL = 'http://localhost:3000';

router.get('/', async (req, res) => {
  const token = req.query.token;
  if (!token) return res.redirect('/login');

  try {
    const decoded = jwt.decode(token);
    const userRes = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    res.render('users', {
      users: userRes.data,
      token,
      user: decoded
    });
  } catch (error) {
    console.error('Error loading users:', error.message);
    res.status(500).send('Failed to load users');
  }
});

module.exports = router;
