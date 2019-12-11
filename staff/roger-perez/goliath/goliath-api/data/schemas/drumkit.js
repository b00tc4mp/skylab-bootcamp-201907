const mongoose = require('mongoose')
const sequence = require('./sequence')

const { Schema, Schema: { Types: { ObjectId } } } = mongoose


module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    bpm:{
        type:Number,
        required: true
    },
    sequences: [sequence]
})
