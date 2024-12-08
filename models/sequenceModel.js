const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    _id : {type: String, required: true},
    seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

const getNextSequence = async (seqName) => {
    const counter = await Counter.findByIdAndUpdate(
        seqName,
        {$inc: {seq: 1}},
        {new: true, upsert: true}
    );
    return counter.seq;
};

module.exports = getNextSequence;