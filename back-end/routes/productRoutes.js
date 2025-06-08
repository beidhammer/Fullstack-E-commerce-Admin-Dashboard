const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: All operations related to products
 */

// Public Routes

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all products
 *       500:
 *         description: Server error
 */
router.get('/', productController.getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product object
 *       404:
 *         description: Product not found
 */
router.get('/:id', productController.getProduct);

// Admin Routes
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - brand
 *               - category
 *               - quantity
 *               - unitprice
 *             properties:
 *               name:
 *                 type: string
 *               brand:
 *                 type: string
 *               category:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               unitprice:
 *                 type: number
 *               description:
 *                 type: string
 *               imgurl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Bad request
 */
router.post('/', authenticate, authorizeAdmin, productController.createProduct);
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               brand:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               unitprice:
 *                 type: number
 *               imgurl:
 *                 type: string
 *               isdeleted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 */
router.put('/:id', authenticate, authorizeAdmin, productController.updateProduct);
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Soft delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product marked as deleted
 *       404:
 *         description: Product not found
 */
router.delete('/:id', authenticate, authorizeAdmin, productController.deleteProduct);

module.exports = router;