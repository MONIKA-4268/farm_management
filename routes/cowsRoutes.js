const express = require('express');
const router = express.Router();
const Cow = require('../models/cow');

// Create new cow
router.post('/', async (req, res) => {
  const { cowId, name, age, milkYield } = req.body;
  try {
    // Validate required fields
    if (!cowId || !name || age == null || milkYield == null) {
      return res.status(400).json({ message: 'Missing required cow fields.' });
    }
    // Optional: Check for duplicate cowId
    const existing = await Cow.findOne({ cowId });
    if (existing) {
      return res.status(409).json({ message: 'Cow ID already exists.' });
    }
    const cow = new Cow({ cowId, name, age, milkYield });
    await cow.save();
    res.status(201).json({ message: 'Cow added', cow });
  } catch (err) {
    res.status(500).json({ message: 'Error adding cow', error: err.message });
  }
});

// Get all cows
router.get('/', async (req, res) => {
  try {
    const cows = await Cow.find({});
    res.json(cows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cows', error: err.message });
  }
});

module.exports = router;