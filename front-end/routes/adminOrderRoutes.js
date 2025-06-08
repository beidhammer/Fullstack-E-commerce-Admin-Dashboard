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
    const ordersRes = await axios.get(`${API_URL}/orders/all`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    res.render('orders', {
      orders: ordersRes.data.data.orders,
      token,
      user: decoded
    });
  } catch (error) {
    console.error('Error loading orders:', error);
    res.status(500).send('Failed to load orders');
  }
});

module.exports = router;