const mongoose = require('mongoose')
const { Schema , Schema : { Types : { ObjectId } } } = mongoose

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
    accreditation: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    role: {
        type: Number,
        required: true
    },
    activity: {
        type: ObjectId,
        ref: 'Activity'
    },
    email : {   
        type: String,
        requried: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true
    }
})