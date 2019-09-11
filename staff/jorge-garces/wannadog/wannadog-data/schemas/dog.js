const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    gender: {
        type: Boolean,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    age: {
        type: Date,
        required: true
    },
    notes: {
        type: String,
    },
    neutered: {
        type: Boolean,
        required: true
    },
    withDogs: {
        type: Boolean,
        required: true
    },
    withCats: {
        type: Boolean,
        required: true
    },
    withChildren: {
        type: Boolean,
        required: true
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            default: [0, 0]
        }
    },

    owner: { type: ObjectId, ref: 'User' }
})