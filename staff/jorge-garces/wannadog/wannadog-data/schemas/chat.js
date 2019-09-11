const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose
const Message = require('./message')

module.exports = new Schema({
    members: {
        type: [{ type: ObjectId, ref: 'User' }]
    },
    messages: [Message]
})