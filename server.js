const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const frontRoutes = require('./routes/frontRoutes');
const methodOverride = require('method-override');

dotenv.config();
const app = express();
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/auth', authRoutes);
app.use('/api', bookRoutes);
app.use('/',frontRoutes);

mongoose.connect(process.env.DB_URI)
    .then(() =>  console.log('Connected to Database'))
    .catch(err => console.log('Connection Error: ', err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));