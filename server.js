require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const livestockRoutes = require('./routes/livestock');
const chemicalRoutes = require('./routes/chemical');
const mrlRoutes = require('./routes/mrl');
const amuRoutes = require('./routes/amu');
const cowsRoutes = require('./routes/cowsRoutes');
const medicineRoutes = require('./routes/medicineRoutes');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies from requests

// MongoDB connection with retry logic
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 10000);
  }
}
connectDB();

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/livestock', livestockRoutes);
app.use('/api/chemicals', chemicalRoutes);
app.use('/api/mrl', mrlRoutes);
app.use('/api/amu', amuRoutes);
app.use('/api/cows', cowsRoutes);
app.use('/api/medicine', medicineRoutes);

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
