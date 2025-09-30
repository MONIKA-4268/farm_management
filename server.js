require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');

const mrlRoutes = require('./routes/mrl');
const amuRoutes = require('./routes/amu');
const cowsRoutes = require('./routes/cowsRoutes');
const medicineRoutes = require('./routes/medicineRoutes');


const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);

app.use('/api/mrl', mrlRoutes);
app.use('/api/amu', amuRoutes);
app.use('/api/cows', cowsRoutes);           // <-- added here
app.use('/api/medicine', medicineRoutes); // <-- added here

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get('/', (req, res) => {
  res.send('Backend API running');
});

module.exports = app;