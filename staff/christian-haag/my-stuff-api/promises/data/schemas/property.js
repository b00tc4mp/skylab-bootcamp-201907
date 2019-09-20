const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

module.exports = new Schema({

    address: {
        type: String,
        required: true
    },
    sqm: {
        type: Number,
        required: true
    },
    yearOfConstruction: {
        type: Number,
        required: true
    },
    cadastre: {
        type: String,
        required: true
    },
    mortgage: {
        type: Boolean,
        required: true
    },
    owners: [{ type: ObjectId, ref: 'User' }],

})