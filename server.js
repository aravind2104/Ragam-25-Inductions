const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', bookRoutes);

mongoose.connect(process.env.DB_URI)
    .then(() =>  console.log('Connected to Database'))
    .catch(err => console.log('Connection Error: ', err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));