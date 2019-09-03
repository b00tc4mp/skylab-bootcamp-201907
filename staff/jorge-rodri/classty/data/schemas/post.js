const mongoose = require('mongoose')
const { Schema, SchemaTypes: { ObjectId } } = mongoose

const Message = require('./message')

module.exports = new Schema({
    subject: {type: ObjectId, ref:'Subject'},
    message: [Message]
 })