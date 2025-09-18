const mongoose = require('mongoose');

const medicineLogSchema = new mongoose.Schema({
  cow_id: { type: String, required: true },
  breed: String,
  weight_kg: Number,
  drug_name: String,
  dose_mg: Number,
  route: String,
  date_administered: Date,
  days_since_treatment: Number,
  measured_residue_mg_per_kg: Number,
  mrl_mg_per_kg: Number,
  withdrawal_days: {
    milk: Number,
    meat: Number
  },
  is_antimicrobial: Boolean
}, { timestamps: true });

module.exports = mongoose.model('medicine_log', medicineLogSchema);

