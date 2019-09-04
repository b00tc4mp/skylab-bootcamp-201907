//const mongoose = require('mongoose')

const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    body: {
        type: String,
        required: true,
        maxlength: 500
    },
    date: {
        type: Date,
        required: true
    }
})