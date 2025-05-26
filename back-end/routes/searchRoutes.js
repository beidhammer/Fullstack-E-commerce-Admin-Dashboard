const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Public search endpoint
router.post('/', searchController.searchProducts);

module.exports = router;