const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    image: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type:Date,
        require: true
    },

    owner: { 
        type: ObjectId, 
        ref: 'User',
        required: true
    },
    merchant_owner:  { type: ObjectId, ref: 'Merchant' }
})