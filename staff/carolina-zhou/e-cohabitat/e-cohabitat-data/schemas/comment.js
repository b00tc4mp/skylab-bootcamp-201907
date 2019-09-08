const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
    author: { type: ObjectId, ref: 'User'},
    posted: {
        type: Date,
        required:true
    },
    text: {
        type: String,
        required: true
    }
})