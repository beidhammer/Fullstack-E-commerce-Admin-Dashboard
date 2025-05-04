const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticate } = require('../middlewares/authMiddleware');

// Only for logged-in users
router.get('/', authenticate, cartController.getCart);
router.post('/', authenticate, cartController.addToCart);
router.delete('/:productId', authenticate, cartController.removeFromCart);
router.post('/checkout/now', authenticate, cartController.checkout);

module.exports = router;