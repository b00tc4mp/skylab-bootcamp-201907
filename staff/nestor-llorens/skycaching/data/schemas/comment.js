const { Schema } = require('mongoose')

const commentSchema = new Schema({
    username: {
        type: String,
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