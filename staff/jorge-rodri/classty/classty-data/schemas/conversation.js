const mongoose = require('mongoose')
const { Schema, SchemaTypes: { ObjectId } } = mongoose

const Message = require('./message')
const Participant = require('./participant')

module.exports = new Schema({

    sender: { type:ObjectId, ref:'User' },
    delivery: [ Participant ],
    message: [ Message ],
    date:{ type: Date, required: true }

 })