const { Schema, ObjectId } = require('mongoose')
const Comment = require('./comment')

module.exports = new Schema({
    taskName: {
        type: String,
        required: true
    },
    taskType: {
        type: String,
        required: true,
        enum: ['particular', 'collective', 'maintenance', 'other']
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    taskSpace: [{ type: ObjectId, ref: 'Space' }],
    companions: [{ type: ObjectId, ref: 'User' }],
    comments: [Comment],
    tags: {
        type: Array
    }
})
