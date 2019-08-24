const mongoose = require('mongoose')

const { Schema } = mongoose

module.exports = new Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    batterylife: {
        type: Number,
        required: true,
        default: 'medium'
    },
    megapixels: {
        type: Number,
        required: true
    }
})