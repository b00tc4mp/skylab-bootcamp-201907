const { Schema, SchemaTypes: { ObjectId }} = require('mongoose')

module.exports = new Schema({
    ingredient: {
        type: ObjectId,
        ref: 'Ingredient'   
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
})