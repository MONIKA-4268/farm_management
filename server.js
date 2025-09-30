require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');

const mrlRoutes = require('./routes/mrl');
const amuRoutes = require('./routes/amu');
const cowsRoutes = require('./routes/cowsRoutes');
const medicineRoutes = require('./routes/medicineRoutes');


const app = express();

app.use(cors());
app.use(express.json());

// Check and connect to MongoDB
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('Error: MONGO_URI not set in environment.');
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// API routes (declare before catch-all)
app.use('/api/auth', authRoutes);

app.use('/api/mrl', mrlRoutes);
app.use('/api/amu', amuRoutes);
app.use('/api/cows', cowsRoutes);
app.use('/api/medicine', medicineRoutes);

// Serve frontend static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Optional root route for API health check
app.get('/api', (req, res) => {
  res.send('Backend API running');
});

// Catch-all route for SPA routing: serve index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
