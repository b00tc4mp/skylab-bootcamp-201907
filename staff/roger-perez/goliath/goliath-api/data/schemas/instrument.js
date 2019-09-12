const mongoose = require('mongoose')
const { Schema, Schema: { Types: { ObjectId } } } = mongoose

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    style: {
        type: String,
        enum: ['rock', 'electro', 'jazz'],
        default: 'rock',
        required: true
    },
    audio: {
        type: String,
        required: true
    }
    
})