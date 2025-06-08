const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: User found }
 *       404: { description: User not found }
 */
router.get('/:id', async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Noe gikk galt' });
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               firstname: { type: string }
 *               lastname: { type: string }
 *               username: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               address: { type: string }
 *               phone: { type: string }
 *     responses:
 *       201: { description: User created }
 *       400: { description: Bad request }
 */
router.post('/', async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.User.create({
      ...rest,
      password: hashedPassword,
      role_id: req.body.role_id || 2,         
      membership_id: req.body.membership_id || 1  
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(400).json({ error: 'Invalid request' });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { type: object }
 *     responses:
 *       200: { description: User updated }
 *       400: { description: Invalid input }
 *       404: { description: User not found }
 */
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await db.User.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ error: 'User not found' });
    const updatedUser = await db.User.findByPk(req.params.id);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: 'Invalid request' });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: User deleted }
 *       404: { description: User not found }
 */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await db.User.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
