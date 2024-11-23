const express = require('express');
const cors = require('cors');
const itineraryRoutes = require('./routes/itineraryRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://travel-iternary-1xak.vercel.app'
}));
app.use(express.json());

// Routes
app.use('/api', itineraryRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 