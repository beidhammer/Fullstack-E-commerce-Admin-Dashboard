const express = require('express');
const router = express.Router();
const db = require('../models');

/**
 * @swagger
 * tags:
 *   name: Memberships
 *   description: Membership levels and discounts
 */

/**
 * @swagger
 * /memberships:
 *   get:
 *     summary: Get all memberships
 *     tags: [Memberships]
 *     responses:
 *       200:
 *         description: List of memberships
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const memberships = await db.Membership.findAll();
    res.json(memberships);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
