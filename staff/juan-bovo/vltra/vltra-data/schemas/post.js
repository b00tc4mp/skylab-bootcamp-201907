//const mongoose = require('mongoose')

const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const Comment = require('./comment')

module.exports = new Schema({
    title: {
        type: String,
        maxlength: 100,
        required: true
    },
    body: {
        type: String,
        maxlength: 2000,
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required:true
    },
    date: {
        type: Date,
        required: true
    },
    comments: [Comment],
    votes: [{type: Number, min: 1, max: 5}]
})