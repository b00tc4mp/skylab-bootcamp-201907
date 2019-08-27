const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

module.exports = new Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['sedan', 'suv', 'van', 'coupe', 'cabrio', 'roadster'],
        default: 'sedan'
    },
    color: {
        type: String,
        required: true
    },
    electric: {
        type: String,
        required: true
    },
    plate: {
        type: String,
        required: true
    },
    owner: [{ type: ObjectId, ref: 'User' }]

})