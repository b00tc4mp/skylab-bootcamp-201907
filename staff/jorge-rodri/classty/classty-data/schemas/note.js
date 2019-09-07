const mongoose = require('mongoose')
const { Schema, SchemaTypes: { ObjectId } } = mongoose

module.exports = new Schema({

    student:{
        type: ObjectId,
        ref: 'User'
    },
    note:{
        type: Number,
        required: true
    }
})