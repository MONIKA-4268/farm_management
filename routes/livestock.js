const express = require('express');
const Livestock = require('../models/livestock');
const auth = require('../middleware/auth');

const router = express.Router();

// Create Livestock
router.post('/', auth, async (req, res) => {
  const { species, breed, birthDate, tagNumber } = req.body;
  const livestock = new Livestock({ owner: req.user.id, species, breed, birthDate, tagNumber });
  await livestock.save();
  res.status(201).json(livestock);
});

// Read Livestock
router.get('/', auth, async (req, res) => {
  const livestock = await Livestock.find({ owner: req.user.id });
  res.json(livestock);
});

// Update Livestock
router.put('/:id', auth, async (req, res) => {
  const { species, breed, birthDate, tagNumber } = req.body;
  const updated = await Livestock.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    { species, breed, birthDate, tagNumber },
    { new: true }
  );
  res.json(updated);
});

// Delete Livestock
router.delete('/:id', auth, async (req, res) => {
  await Livestock.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
  res.json({ message: 'Deleted' });
});

module.exports = router;
