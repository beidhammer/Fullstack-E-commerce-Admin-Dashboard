const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and registration
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstname, lastname, username, email, password]
 *             properties:
 *               firstname: { type: string }
 *               lastname: { type: string }
 *               username: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               address: { type: string }
 *               phone: { type: string }
 *     responses:
 *       201: { description: User registered successfully }
 *       400: { description: Invalid request }
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login as a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               emailOrUsername: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: Login successful, returns JWT }
 *       401: { description: Invalid credentials }
 */
router.post('/login', authController.login);

module.exports = router;
