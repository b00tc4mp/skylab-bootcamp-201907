const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = new Schema({
    number: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['empty' , 'part' , 'full'],
        required: true
    },
    morningPermanence: {
        type: Boolean,
        required: true
    },
    afternoonPermanence: {
        type: Boolean,
        required: true
    },
    lunch: {
        type: Boolean,
        required: true
    }
})