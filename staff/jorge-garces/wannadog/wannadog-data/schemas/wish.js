const mongoose = require('mongoose')
const { Schema } = mongoose

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
        type: Number
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
        type: Number
    }
})