const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Brand management
 */

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: List of all brands
 */
router.get('/', brandController.getBrands);

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Get brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Brand found }
 *       404: { description: Brand not found }
 */
router.get('/:id', brandController.getBrand);

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string }
 *     responses:
 *       201: { description: Brand created }
 */
router.post('/', authenticate, authorizeAdmin, brandController.createBrand);

/**
 * @swagger
 * /brands/{id}:
 *   put:
 *     summary: Update a brand
 *     tags: [Brands]
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
 *             properties:
 *               name: { type: string }
 *     responses:
 *       200: { description: Brand updated }
 */
router.put('/:id', authenticate, authorizeAdmin, brandController.updateBrand);

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Delete a brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Brand deleted }
 */
router.delete('/:id', authenticate, authorizeAdmin, brandController.deleteBrand);

module.exports = router;
