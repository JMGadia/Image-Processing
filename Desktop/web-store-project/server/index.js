const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. Your Auth Routes (Must come BEFORE the catch-all)
app.use('/api/auth', authRoutes);

// 3. The Safe Catch-all (This replaces the one that was crashing)
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next(); // This allows your signup/login routes to work
  }
  res.status(200).send('Server is running');
});

// 4. Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});