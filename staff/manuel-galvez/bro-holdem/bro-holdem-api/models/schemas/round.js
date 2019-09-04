const mongoose = require('mongoose')
const { Schema } = mongoose
const moveSchema = require('./move')

module.exports = new Schema({
    card_code: {
        type: String,
        required: true
    },

    card_image: {
        type: String,
        required: true,
    },

    move: [moveSchema]
})
