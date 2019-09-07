const mongoose = require('mongoose')
const { Schema , SchemaTypes: { ObjectId } } = mongoose

module.exports = new Schema({
    title:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    expiry:{
        type: Date,
        required: true
    },
    delivery:[ { type: ObjectId, ref:'User' } ]
})