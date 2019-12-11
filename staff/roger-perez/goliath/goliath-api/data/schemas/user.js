const { Schema } = require('mongoose')
const drumkit = require('./drumkit')


module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    instrument: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true
    },
    drumkits: [drumkit],
    admin:{
        type: Boolean,
        required: true
    }
   
})
