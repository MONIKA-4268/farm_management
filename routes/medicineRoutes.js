const express = require('express');
const router = express.Router();
const MedicineLog = require('../models/medicinelog'); // ✅ Fixed path

// POST: Log medicine for a cow
router.post('/', async (req, res) => {
  console.log('POST /api/medicine', req.body); // Debug log

  const {
    cowId,
    drugName,
    dose,
    frequency,
    dateGiven,
    duration,
    withdrawalPeriod,
  } = req.body;

  // Basic validation
  if (!cowId || !drugName || !dose || !dateGiven) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  // Optional: Validate date and dose format
  const parsedDate = new Date(dateGiven);
  if (isNaN(parsedDate)) {
    return res.status(400).json({ message: 'Invalid date format.' });
  }

  if (isNaN(Number(dose))) {
    return res.status(400).json({ message: 'Dose must be a number.' });
  }

  try {
    const log = new MedicineLog({
      cowId,
      drugName,
      dose,
      frequency,
      dateGiven: parsedDate,
      duration,
      withdrawalPeriod,
    });

    await log.save();
    res.status(201).json({ message: 'Medicine logged successfully.', log });
  } catch (err) {
    console.error('Error saving medicine log:', err);
    res.status(500).json({ message: 'Error logging medicine.', error: err.message });
  }
});

// GET: Medicine usage report for a cow
router.get('/report/:cowId', async (req, res) => {
  const { cowId } = req.params;

  try {
    const logs = await MedicineLog.find({ cowId }).sort({ dateGiven: -1 }); // Sorted by latest
    res.json(logs);
  } catch (err) {
    console.error('Error fetching medicine logs:', err);
    res.status(500).json({ message: 'Error fetching medicine logs.', error: err.message });
  }
});

module.exports = router