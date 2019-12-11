const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose

module.exports = new Schema({
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    viewed: {
        type: Boolean,
        required: true,
        default: false
    },
    user: { type: ObjectId, ref: 'User' }
})