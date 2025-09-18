const mongoose = require('mongoose');

const amuSchema = new mongoose.Schema({
  tagNo: { type: String, required: true },
  chemical: { type: mongoose.Schema.Types.ObjectId, ref: 'Chemical', required: true },
  dosage: { type: String, required: true },
  date: { type: Date, required: true },
  startDate: Date,
  endDate: Date,
  treatmentReason: String,
  administeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AMU', amuSchema);
