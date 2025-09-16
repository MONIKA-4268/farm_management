const mongoose = require('mongoose');

const mrlSchema = new mongoose.Schema({
  chemical: { type: mongoose.Schema.Types.ObjectId, ref: 'Chemical' },
  species: String,
  maxResidueLimit: Number,
  regulatorySource: String,
  effectiveDate: Date,
  expiryDate: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MRL', mrlSchema);

