const express = require('express');
const router = express.Router();
const initController = require('../controllers/initController');

/**
 * @swagger
 * /init:
 *   post:
 *     summary: Initiate database with roles, adminuser and testdata
 *     responses:
 *       200:
 *         description: Database added
 */
router.post('/', initController.initializeDatabase);

module.exports = router;