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
    const membershipRes = await axios.get(`${API_URL}/memberships`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    res.render('memberships', {
      memberships: membershipRes.data,
      token,
      user: decoded
    });
  } catch (error) {
    console.error('Error loading memberships:', error.message);
    res.status(500).send('Failed to load memberships');
  }
});

module.exports = router;
