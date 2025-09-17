const express = require('express');
const Chemical = require('../models/chemical');
const auth = require('../middleware/auth');
const router = express.Router();

// Create chemical
router.post('/', auth, async (req, res) => {
  try {
    const { name, type, description } = req.body;
    const chemical = new Chemical({ name, type, description });
    await chemical.save();
    res.status(201).json(chemical);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all chemicals
router.get('/', auth, async (req, res) => {
  try {
    const chemicals = await Chemical.find();
    res.json(chemicals);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update chemical
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, type, description } = req.body;
    const updated = await Chemical.findByIdAndUpdate(
      req.params.id,
      { name, type, description },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Chemical not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete chemical
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Chemical.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Chemical not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
