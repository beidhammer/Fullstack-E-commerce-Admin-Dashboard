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
    const categoryRes = await axios.get(`${API_URL}/categories`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    res.render('categories', {
      categories: categoryRes.data.data.categories,
      token,
      user: decoded
    });
  } catch (error) {
    console.error('Error loading categories:', error.message);
    res.status(500).send('Failed to load categories');
  }
});

module.exports = router;
