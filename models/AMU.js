const mongoose = require('mongoose');

const amuSchema = new mongoose.Schema({
  livestock: { type: mongoose.Schema.Types.ObjectId, ref: 'Livestock' },
  chemical: { type: mongoose.Schema.Types.ObjectId, ref: 'Chemical' },
  dosage: String,
  startDate: Date,
  endDate: Date,
  treatmentReason: String,
  administeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AMU', amuSchema);
