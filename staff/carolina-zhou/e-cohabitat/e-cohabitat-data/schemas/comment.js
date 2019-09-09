const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
    authorId: { type: ObjectId, ref: 'User'},
    author: {
        type: String,
        required: true
    },
    posted: {
        type: Date,
        required:true
    },
    text: {
        type: String,
        required: true
    }
})