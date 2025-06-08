const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Product search functionality
 */

/**
 * @swagger
 * /search:
 *   post:
 *     summary: Search for products by name, category, or brand
 *     tags: [Search]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               category: { type: string }
 *               brand: { type: string }
 *     responses:
 *       200:
 *         description: Search results
 */
router.post('/', searchController.searchProducts);

module.exports = router;
