const { Schema } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    characteristics: {
        type: String,
        required: false
    }
})