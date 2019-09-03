const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose
const messageSchema = require('./message')

module.exports = new Schema({
    members: {
        type: [{ type: ObjectId, ref: 'User' }]
    },
    messages: [messageSchema]
})