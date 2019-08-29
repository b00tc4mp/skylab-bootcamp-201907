const { Schema } = require('mongoose')

module.exports = new Schema({
    number: {
        type: Number,
        required: true
    },
    expiry: {
        type: Date,
        required: true
    }
})