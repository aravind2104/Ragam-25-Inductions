const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    published_year: { type: Number, required: true },
    available_copies: { type: Number, required: true },
});

module.exports = mongoose.model('Book', bookSchema);