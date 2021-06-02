const mongoose = require('mongoose');

const event = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    time: { type: Date, required: true },
    participants: { Array, required: false },
    reoccurring: { Boolean, required: false}
});

module.exports = mongoose.model('serverEvent', event);