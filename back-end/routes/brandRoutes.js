const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');

// Public Routes
router.get('/', brandController.getBrands);
router.get('/:id', brandController.getBrand);

// Admin Routes
router.post('/', authenticate, authorizeAdmin, brandController.createBrand);
router.put('/:id', authenticate, authorizeAdmin, brandController.updateBrand);
router.delete('/:id', authenticate, authorizeAdmin, brandController.deleteBrand);

module.exports = router;