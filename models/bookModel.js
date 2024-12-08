const mongoose = require('mongoose');
const Counter = require('./sequenceModel');

const bookSchema = new mongoose.Schema({
    _id: {type: Number},
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    published_year: { type: Number, required: true },
    available_copies: { type: Number, required: true },
});

bookSchema.pre('save', async function(next) {
    if(this.isNew) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'bookId' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            if(!counter) {
                throw new Error("Counter not found");
            }
            this._id = counter.seq;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model('Book', bookSchema);