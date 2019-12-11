const mongoose = require('mongoose')
const { Schema , Schema : {Types : { ObjectId } } } = mongoose 

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    },
    healthcard: {
        type: String,
        required: true
    },
    tutor: {
        type: ObjectId,
        ref: 'Tutor',
        required: true
    }
})