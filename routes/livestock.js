const express = require('express');
const Livestock = require('../models/livestock');
const auth = require('../middleware/auth');

const router = express.Router();

// Create Livestock
router.post('/', auth, async (req, res) => {
  try {
    const { species, breed, birthDate, tagNumber } = req.body;
    if (!species || !breed || !birthDate || !tagNumber) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const livestock = new Livestock({
      owner: req.user.id,
      species,
      breed,
      birthDate,
      tagNumber
    });
    await livestock.save();
    res.status(201).json(livestock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read All Livestock for current user
router.get('/', auth, async (req, res) => {
  try {
    const livestock = await Livestock.find({ owner: req.user.id });
    res.json(livestock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Livestock by id
router.put('/:id', auth, async (req, res) => {
  try {
    const { species, breed, birthDate, tagNumber } = req.body;
    const updated = await Livestock.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { species, breed, birthDate, tagNumber },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Livestock not found or unauthorized.' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Livestock by id
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Livestock.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!deleted) {
      return res.status(404).json({ error: 'Livestock not found or unauthorized.' });
    }
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
