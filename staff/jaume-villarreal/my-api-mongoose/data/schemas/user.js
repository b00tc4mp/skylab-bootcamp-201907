const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = new Schema({
    name : {
        type: String,
        required: true
    },

    surname : {
        type: String,
        required: true
    },

    email: {
        type: String,
        lowercase: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})