const mongoose = require('mongoose');

const livestockSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
 
  breed: String,
  birthDate: Date,
  tagNumber: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Livestock', livestockSchema);
