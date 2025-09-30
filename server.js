require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth');
const livestockRoutes = require('./routes/livestock');
const chemicalRoutes = require('./routes/chemical');
const mrlRoutes = require('./routes/mrl');
const amuRoutes = require('./routes/amu');
const cowsRoutes = require('./routes/cowsRoutes');
const medicineRoutes = require('./routes/medicineRoutes');

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// MongoDB connection with retry logic
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message, 'Retrying in 10s...');
    setTimeout(connectDB, 10000); // Retry after 10 seconds
  }
}
connectDB();

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔌 MongoDB connection closed due to app termination');
  process.exit(0);
});

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
