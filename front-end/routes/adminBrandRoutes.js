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
    const brandRes = await axios.get(`${API_URL}/brands`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    res.render('brand', {
      brands: brandRes.data.data.brands,
      token,
      user: decoded
    });
  } catch (error) {
    console.error('Error loading brands:', error.message);
    res.status(500).send('Failed to load brands');
  }
});

module.exports = router;