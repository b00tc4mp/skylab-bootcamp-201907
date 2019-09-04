const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose

module.exports = new Schema({

    breed: {
        type: String
    },
    gender: {
        type: Boolean
    },
    size: {
        type: String
    },
    age: {
        type: Date
    },
    neutered: {
        type: Boolean
    },
    withDogs: {
        type: Boolean
    },
    withCats: {
        type: Boolean
    },
    withChildren: {
        type: Boolean
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },

    wisher: { type: ObjectId, ref: 'User' }
})