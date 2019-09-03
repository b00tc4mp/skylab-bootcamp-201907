const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    image: {
        type: String,
        required: true
    },
    description: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ubication: {
        type: String,
        required: true
    },

    owner: [{ type: ObjectId, ref: 'User' }] 
})