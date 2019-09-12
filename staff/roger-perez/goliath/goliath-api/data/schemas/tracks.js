const mongoose = require('mongoose')
const { Schema, Schema: { Types: { ObjectId } } } = mongoose

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    style: {
        type: String,
        enum: ['rock', 'blues'],
        default: 'rock',
        required: true
    },
    instrument: {
        type: String,
        enum: ['guitar', 'bass','drums'],
        default: 'drums',
        required: true
    },
    tone: {
        type: String,
        enum: ['em', 'am'],
        default: 'rock',
        required: true
    },
    audio: {
        type: String,
        required: true
    },
    
})