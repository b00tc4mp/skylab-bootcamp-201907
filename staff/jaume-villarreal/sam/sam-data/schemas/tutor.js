const mongoose = require('mongoose')
const { Schema , Schema : {Types : {ObjectId} } } = mongoose

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    phone1: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})