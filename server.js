require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const livestockRoutes = require('./routes/livestock');
const chemicalRoutes = require('./routes/chemical');
const mrlRoutes = require('./routes/mrl');
const amuRoutes = require('./routes/amu');
const cowRoutes = require('./routes/cowRoutes');
const medicineRoutes = require('./routes/medicineRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/livestock', livestockRoutes);
app.use('/api/chemicals', chemicalRoutes);
app.use('/api/mrl', mrlRoutes);
app.use('/api/amu', amuRoutes);
app.use('/api/cows', cowRoutes);           // <-- added here
app.use('/api/medicine', medicineRoutes); // <-- added here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
