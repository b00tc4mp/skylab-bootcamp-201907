const mongoose = require('mongoose')

const { Schema } = mongoose

module.exports = new Schema({
    cardBrand: {
        type: String,
        required: true
    },
    cardType: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true
    },
    expiry: {
        type: Date,
        required: true
    }
})