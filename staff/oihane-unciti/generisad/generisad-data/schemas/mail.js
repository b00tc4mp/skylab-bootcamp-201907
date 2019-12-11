const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({

    sender : { type: ObjectId, ref: 'User' }, 

    receiver : { type: ObjectId, ref: 'User' },

    date: {
        type: Date,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    read: { 
        type: Boolean,
        default: false
    },
    
    advertisement: { type: ObjectId, ref: 'Product' },
    merchant_owner:  { type: ObjectId, ref: 'Merchant' }
})