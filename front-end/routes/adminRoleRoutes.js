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
    const roleRes = await axios.get(`${API_URL}/roles`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    res.render('roles', {
      roles: roleRes.data,
      token,
      user: decoded
    });
  } catch (error) {
    console.error('Error loading roles:', error.message);
    res.status(500).send('Failed to load roles');
  }
});

module.exports = router;
