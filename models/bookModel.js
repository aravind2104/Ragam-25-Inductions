const mongoose = require('mongoose');
const getNextSequence = require('./sequenceModel');

const bookSchema = new mongoose.Schema({
    id:{type:Number, required:true},
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    published_year: { type: Number, required: true },
    available_copies: { type: Number, required: true },
});

bookSchema.pre('save', async function(next) {
    if(!this.id) {
        this.id = await getNextSequence('bookId');
    }
    next();
});

module.exports = mongoose.model('Book', bookSchema);