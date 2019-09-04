const mongoose = require('mongoose')
const Schema = mongoose

const commentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true,
    }
    
})

module.exports = commentSchema