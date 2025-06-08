const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');

// GET /login
router.get('/', (req, res) => {
  res.render('login', { error: null, token: null }); 
});

// POST /login
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await axios.post(
      'http://localhost:3000/auth/login',
      {
        emailOrUsername: email,
        password
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const token = response.data.data.token;

    res.redirect(`/admin/products?token=${token}`);
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    res.render('login', { error: 'Invalid credentials. Try again.', token: null });
  }
});

module.exports = router;