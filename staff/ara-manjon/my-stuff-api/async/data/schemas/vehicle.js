const mongoose = require('mongoose')

const {
    Schema
} = mongoose

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
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['car', 'motorcycle', 'truck', 'caravan', 'camper van', 'delivery van', 'bicycle'],
        default: 'car'
    },
    color: {
        type: String,
        required: true,
    },
    electric: {
        type: Boolean,
        required: true,
        default: false
    },
    plate: {
        type: String,
        required: true,
    },
    extra: {
        type: String
    }

})