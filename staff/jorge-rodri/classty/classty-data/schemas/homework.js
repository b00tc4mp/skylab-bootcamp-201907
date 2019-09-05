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
    type:{
        type: String,
        enum: ['todo','done','review']
    },
    delivery:[ { type: ObjectId, ref:'User' } ]
})