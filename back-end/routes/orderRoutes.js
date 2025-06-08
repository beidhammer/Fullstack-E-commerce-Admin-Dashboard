const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order operations
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order (checkout cart)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created
 *       400:
 *         description: Bad request
 */
router.post('/', authenticate, orderController.createOrder);

/**
 * @swagger
 * /orders/all:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of all orders }
 */
router.get('/all', authenticate, authorizeAdmin, orderController.getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Order found }
 */
router.get('/:id', authenticate, authorizeAdmin, orderController.getOrderById);

/**
 * @swagger
 * /orders/{id}/status:
 *   put:
 *     summary: Update the status of an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status: { type: string }
 *     responses:
 *       200: { description: Status updated }
 */
router.put('/:id/status', authenticate, authorizeAdmin, orderController.updateOrderStatus);

module.exports = router;
