//const mongoose = require('mongoose')

const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    commentAuthor: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    commentBody: {
        type: String,
        required: true,
        maxlength: 500
    },
    commentDate: {
        type: Date,
        required: true
    }
})