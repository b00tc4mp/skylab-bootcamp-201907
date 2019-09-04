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
    gender: {
        type: Boolean,
        required: false
    },
    size: {
        type: String,
        required:false
    },
    characteristics: {
        type: String,
        required: false
    }
})