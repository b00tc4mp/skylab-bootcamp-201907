const mongoose = require('mongoose')
const { Schema, SchemaTypes: { ObjectId } } = mongoose

const Message = require('./message')

module.exports = new Schema({
    users: [
        { type: ObjectId, ref: 'User'}
    ],
    message: [Message]
 })