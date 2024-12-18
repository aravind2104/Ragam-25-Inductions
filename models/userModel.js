const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    membership_type: { type: String, enum: ['Regular', 'Premium'], required: true },
    registered_date: { type: Date, default: Date.now },
    role: { type: String, enum: ['User', 'Admin'], default: 'User' },
});

module.exports = mongoose.model('User', userSchema);