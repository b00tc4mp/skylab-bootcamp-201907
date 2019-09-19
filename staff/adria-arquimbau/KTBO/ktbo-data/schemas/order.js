const { Schema, ObjectId } = require('mongoose')
const itemSchema = require('./item')

/* const mongoose = require('mongoose')
const { Schema } = mongoose */

module.exports = new Schema({
    date: {
        type: Date,
        required: false
    },
    state: {
        type: String,
        default: 'pending'
    },
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    items: [itemSchema]
})