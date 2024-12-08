const mongoose = require('mongoose');
const getNextSequence = require('./sequenceModel');

const userSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    membership_type: { type: String, enum: ['Regular', 'Premium'], required: true },
    registered_date: { type: Date, default: Date.now },
});

userSchema.pre('save', async function(next) {
    if(!this.id) {
        this.id = await getNextSequence('userId');
    }
    next();
});

module.exports = mongoose.model('User', userSchema);