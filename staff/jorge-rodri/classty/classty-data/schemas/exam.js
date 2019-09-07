const mongoose = require('mongoose')
const { Schema, SchemaTypes: { ObjectId } } = mongoose

module.exports = new Schema({

    title:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    note:{
        type: Number,
        required: true
    },
    presented:[ { type: ObjectId, ref:'User' } ]
})