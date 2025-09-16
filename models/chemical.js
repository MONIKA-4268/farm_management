const mongoose = require('mongoose');

const chemicalSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['pesticide', 'veterinary_drug', 'other'] },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chemical', chemicalSchema);
