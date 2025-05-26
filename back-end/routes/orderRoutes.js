const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');

// Routes for authenticated users
router.post('/', authenticate, orderController.createOrder);

// Admin routes
router.get('/all', authenticate, authorizeAdmin, orderController.getAllOrders);
router.get('/:id', authenticate, authorizeAdmin, orderController.getOrderById);
router.put('/:id/status', authenticate, authorizeAdmin, orderController.updateOrderStatus);

module.exports = router;