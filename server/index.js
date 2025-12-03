const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); // Allows us to read JSON data sent from frontend
app.use(cors());

// Import Routes
const authRoutes = require('./routes/auth'); // <--- 1. Import
const expenseRoutes = require('./routes/expenses');

// Use Routes
app.use('/api/auth', authRoutes); // <--- 2. Mount
app.use('/api/expenses', expenseRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});