const medicineLogSchema = new mongoose.Schema({
  cowId: { type: String, required: true }, // references cow by ID
  drugName: String,
  dose: Number, // mg/kg
  frequency: String,
  dateGiven: Date,
  duration: Number, // days
  withdrawalPeriod: Number, // days
});

module.exports = mongoose.model('MedicineLog', medicineLogSchema);
