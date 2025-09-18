const express = require('express');
const AMU = require('../models/AMU');
const router = express.Router();

// Create AMU record (no auth for API endpoint)
router.post('/', async (req, res) => {
  try {
    // Accept either simple client-side fields or full model fields
    const {
      tagNo, // client-side
      chemical,
      date, // client-side
      dosage,

      // Optionally accept full model fields for admin/advanced client
      livestock,
      startDate,
      endDate,
      treatmentReason,
      administeredBy
    } = req.body;

    // Use tagNo, date, dosage for simple logs (from your HTML frontend)
    if (tagNo && chemical && date && dosage) {
      const amu = new AMU({
        tagNo,
        chemical,
        date,
        dosage
      });
      await amu.save();
      return res.status(201).json(amu);
    }

    // Use advanced model if livestock etc. provided
    const amu = new AMU({
      livestock,
      chemical,
      dosage,
      startDate,
      endDate,
      treatmentReason,
      administeredBy
    });
    await amu.save();
    res.status(201).json(amu);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all AMU records (no auth for API endpoint)
router.get('/', async (req, res) => {
  try {
    // Find all records (simple and advanced)
    const amuRecords = await AMU.find();
    res.json(amuRecords);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update AMU (advanced usage)
router.put('/:id', async (req, res) => {
  try {
    const {
      tagNo,
      chemical,
      date,
      dosage,
      livestock,
      startDate,
      endDate,
      treatmentReason,
      administeredBy
    } = req.body;

    const updated = await AMU.findByIdAndUpdate(
      req.params.id,
      {
        tagNo,
        chemical,
        date,
        dosage,
        livestock,
        startDate,
        endDate,
        treatmentReason,
        administeredBy
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'AMU record not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete AMU
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await AMU.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'AMU record not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;