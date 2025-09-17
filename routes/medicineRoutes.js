const express = require('express');
const router = express.Router();
const MedicineLog = require('../models/medicinelog');

// Log medicine for a cow
router.post('/', async (req, res) => {
  const { cowId, drugName, dose, frequency, dateGiven, duration, withdrawalPeriod } = req.body;
  try {
    const log = new MedicineLog({ cowId, drugName, dose, frequency, dateGiven, duration, withdrawalPeriod });
    await log.save();
    res.status(201).json({ message: 'Medicine logged', log });
  } catch (err) {
    res.status(500).json({ message: 'Error logging medicine', error: err.message });
  }
});

// Example: Get medicine usage report for a cow
router.get('/report/:cowId', async (req, res) => {
  const { cowId } = req.params;
  try {
    const logs = await MedicineLog.find({ cowId });
    // Aggregate or compute totals here if needed
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching medicine logs', error: err.message });
  }
});

module.exports = router;
