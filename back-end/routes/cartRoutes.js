const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticate } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart and checkout operations
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Returns cart contents }
 */
router.get('/', authenticate, cartController.getCart);

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add a product to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, quantity]
 *             properties:
 *               productId: { type: integer }
 *               quantity: { type: integer }
 *     responses:
 *       200: { description: Product added to cart }
 */
router.post('/', authenticate, cartController.addToCart);

/**
 * @swagger
 * /cart/{productId}:
 *   delete:
 *     summary: Remove a product from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Product removed from cart }
 */
router.delete('/:productId', authenticate, cartController.removeFromCart);

/**
 * @swagger
 * /cart/checkout/now:
 *   post:
 *     summary: Checkout current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201: { description: Order created and cart checked out }
 */
router.post('/checkout/now', authenticate, cartController.checkout);

module.exports = router;
