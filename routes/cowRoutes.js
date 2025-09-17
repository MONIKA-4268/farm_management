const express = require('express');
const router = express.Router();
const Cow = require('../models/cow');

// Create new cow
router.post('/', async (req, res) => {
  const { cowId, name, age, milkYield } = req.body;
  try {
    const cow = new Cow({ cowId, name, age, milkYield });
    await cow.save();
    res.status(201).json({ message: 'Cow added', cow });
  } catch (err) {
    res.status(500).json({ message: 'Error adding cow', error: err.message });
  }
});

// Get all cows (optionally extend for query/filter)
router.get('/', async (req, res) => {
  try {
    const cows = await Cow.find({});
    res.json(cows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cows', error: err.message });
  }
});

module.exports = router;
