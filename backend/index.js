const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// This allows the application to read incoming data
app.use(express.json());

// Connect to the KITH database
mongoose.connect('mongodb://127.0.0.1:27017/KITH')
  .then(() => console.log('Connected to Database'))
  .catch(err => console.log(err));

// Connect your registration and login routes
app.use('/api/auth', authRoutes);

// Your original basic route to verify it is running
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});