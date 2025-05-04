const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');

// Public Routes
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);

// Admin Routes
router.post('/', authenticate, authorizeAdmin, categoryController.createCategory);
router.put('/:id', authenticate, authorizeAdmin, categoryController.updateCategory);
router.delete('/:id', authenticate, authorizeAdmin, categoryController.deleteCategory);

module.exports = router;