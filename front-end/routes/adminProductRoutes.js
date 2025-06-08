const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_URL = 'http://localhost:3000';
const jwt = require('jsonwebtoken');

// Middleware
router.use((req, res, next) => {
  const token = req.query.token;
  if (!token) return res.redirect('/login');

  res.locals.token = token;

  try {
    const decoded = jwt.decode(token);
    res.locals.user = decoded;
  } catch (err) {
    console.error('Invalid token:', err);
    return res.redirect('/login');
  }

  next();
});

// Admin dashboard
router.get('/', async (req, res) => {
  try {
    const [productRes, brandRes, categoryRes] = await Promise.all([
      axios.get(`${API_URL}/products`, {
        headers: { Authorization: `Bearer ${res.locals.token}` }
      }),
      axios.get(`${API_URL}/brands`),
      axios.get(`${API_URL}/categories`)
    ]);

    res.render('products', {
      products: productRes.data.data.products,
      brands: brandRes.data.data.brands,
      categories: categoryRes.data.data.categories,
      search: {},
      token: res.locals.token
    });
  } catch (error) {
    console.error('Error when GET:', error.message);
    res.render('products', { products: [], brands: [], categories: [], search: {}, token: res.locals.token });
  }
});

// Search handler (POST)
router.post('/search', async (req, res) => {
  const search = req.body;
  const token = req.query.token || req.body.token || res.locals.token || '';
  try {
    const [searchRes, brandRes, categoryRes] = await Promise.all([
      axios.post(`${API_URL}/search`, search, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      axios.get(`${API_URL}/brands`),
      axios.get(`${API_URL}/categories`)
    ]);
    res.render('products', {
      products: searchRes.data.data.result || [],
      brands: brandRes.data.data.brands,
      categories: categoryRes.data.data.categories,
      search,
      token
    });
  } catch (error) {
    console.error('Error when search:', error.message);
    res.render('products', { products: [], brands: [], categories: [], search: req.body, token });
  }
});

module.exports = router;