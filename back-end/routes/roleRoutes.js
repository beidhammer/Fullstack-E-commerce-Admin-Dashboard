const express = require('express');
const router = express.Router();
const db = require('../models');

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: User roles
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of roles
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
    const roles = await db.Role.findAll();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
