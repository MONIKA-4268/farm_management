const express = require('express');
const MRL = require('../models/MRL');
const auth = require('../middleware/auth');
const router = express.Router();

// Create MRL record
router.post('/', auth, async (req, res) => {
  try {
    const { chemical, species, maxResidueLimit, regulatorySource, effectiveDate, expiryDate } = req.body;
    const mrl = new MRL({
      chemical,
      species,
      maxResidueLimit,
      regulatorySource,
      effectiveDate,
      expiryDate,
    });
    await mrl.save();
    res.status(201).json(mrl);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all MRLs
router.get('/', auth, async (req, res) => {
  try {
    const mrls = await MRL.find().populate('chemical');
    res.json(mrls);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update MRL
router.put('/:id', auth, async (req, res) => {
  try {
    const { chemical, species, maxResidueLimit, regulatorySource, effectiveDate, expiryDate } = req.body;
    const updated = await MRL.findByIdAndUpdate(
      req.params.id,
      { chemical, species, maxResidueLimit, regulatorySource, effectiveDate, expiryDate },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'MRL not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete MRL
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await MRL.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'MRL not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
