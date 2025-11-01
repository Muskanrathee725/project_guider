const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const { connect } = require('mongoose');

connectDB();
// Body parser middleware
app.use(express.json());



const PORT = 5000;

// Ek basic test route banana
app.get('/', (req, res) => {
  res.send('<h1>Hello Muskan! Backend is running... 🚀</h1>');
});
app.use('/api/users', require('./routes/userRoutes'));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});