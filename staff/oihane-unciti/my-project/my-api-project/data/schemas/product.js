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
    user: [{ type: ObjectId, ref: 'User' }],
    fav:  [{ type: ObjectId, ref: 'Product' }]
})