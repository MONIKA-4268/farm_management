const mongoose = require('mongoose');

const medicineLogSchema = new mongoose.Schema({
  cowId: {
    type: String,
    required: true,
    index: true // improves query performance
  },
  drugName: {
    type: String,
    required: true,
    trim: true
  },
  dose: {
    type: Number,
    required: true,
    min: 0 // dosage must be positive
  },
  frequency: {
    type: String,
    required: true,
    enum: ['once', 'daily', 'weekly', 'monthly'] // standardize entries
  },
  dateGiven: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1 // treatment must last at least one day
  },
  withdrawalPeriod: {
    type: Number,
    required: true,
    min: 0 // can't be negative
  },
  administeredBy: {
    type: String,
    default: 'Unknown' // optional field for vet or user ID
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

// Compound index for common queries
medicineLogSchema.index({ cowId: 1, dateGiven: -1 });

module.exports = mongoose.model('MedicineLog', medicineLogSchema);