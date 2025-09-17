const express = require('express');
const AMU = require('../models/AMU');
const auth = require('../middleware/auth');
const router = express.Router();

// Create AMU record
router.post('/', auth, async (req, res) => {
  try {
    const { livestock, chemical, dosage, startDate, endDate, treatmentReason, administeredBy } = req.body;
    const amu = new AMU({
      livestock,
      chemical,
      dosage,
      startDate,
      endDate,
      treatmentReason,
      administeredBy,
    });
    await amu.save();
    res.status(201).json(amu);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all AMU records
router.get('/', auth, async (req, res) => {
  try {
    const amuRecords = await AMU.find().populate('livestock chemical administeredBy');
    res.json(amuRecords);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update AMU
router.put('/:id', auth, async (req, res) => {
  try {
    const { livestock, chemical, dosage, startDate, endDate, treatmentReason, administeredBy } = req.body;
    const updated = await AMU.findByIdAndUpdate(
      req.params.id,
      { livestock, chemical, dosage, startDate, endDate, treatmentReason, administeredBy },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'AMU record not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete AMU
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await AMU.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'AMU record not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
