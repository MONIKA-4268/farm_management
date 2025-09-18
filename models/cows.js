const mongoose = require('mongoose');

const cowSchema = new mongoose.Schema({
  cowId: { type: String, required: true, unique: true }, // Unique cow ID
  name: String,
  age: Number,
  milkYield: Number,
  // other relevant fields
});

module.exports = mongoose.model('Cow', cowSchema);
