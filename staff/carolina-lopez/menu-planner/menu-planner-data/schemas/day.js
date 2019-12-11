const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    breakfast: {
        type: ObjectId,
        ref: 'Recipe',
        required: true
    },
    lunch: {
        type: ObjectId,
        ref: 'Recipe',
        required: true
    },
    snack: {
        type: ObjectId,
        ref: 'Recipe',
        required: true
    },
    dinner: {
        type: ObjectId,
        ref: 'Recipe',
        required: true
    }
})


