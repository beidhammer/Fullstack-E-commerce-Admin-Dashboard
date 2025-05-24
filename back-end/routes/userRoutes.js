const express = require('express');
const router = express.Router();
const db = require('../models');

// Hent alle brukere
router.get('/', async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Noe gikk galt' });
  }
});

// Hent en spesifikk bruker
router.get('/:id', async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Bruker ikke funnet' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Noe gikk galt' });
  }
});

// Opprett ny bruker
router.post('/', async (req, res) => {
  try {
    const newUser = await db.User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: 'Ugyldig forespørsel' });
  }
});

// Oppdater eksisterende bruker
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await db.User.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ error: 'Bruker ikke funnet' });
    const updatedUser = await db.User.findByPk(req.params.id);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: 'Ugyldig forespørsel' });
  }
});

// Slett bruker
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await db.User.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ error: 'Bruker ikke funnet' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Noe gikk galt' });
  }
});

module.exports = router;