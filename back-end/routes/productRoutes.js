const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');

// Public Routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);

// Admin Routes
router.post('/', authenticate, authorizeAdmin, productController.createProduct);
router.put('/:id', authenticate, authorizeAdmin, productController.updateProduct);
router.delete('/:id', authenticate, authorizeAdmin, productController.deleteProduct);

module.exports = router;