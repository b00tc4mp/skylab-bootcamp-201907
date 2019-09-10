const mongoose = require('mongoose')
const { Schema, SchemaTypes: { ObjectId } } = mongoose

const Message = require('./message')
const Participant = require('./participant')

module.exports = new Schema({

    sender: { type:ObjectId, ref:'User' },
    reciver: { type:ObjectId, ref: 'User'},
    deliveries: [ Participant ],
    message: [ Message ],
    date:{ type: Date, required: true }

 })