const mongoose = require('mongoose')
const Schema = mongoose

const commentSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    found: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
    
})

module.exports = commentSchema