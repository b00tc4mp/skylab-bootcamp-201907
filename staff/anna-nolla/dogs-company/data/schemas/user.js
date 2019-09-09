const mongoose = require('mongoose')
const { Schema } = mongoose
const Pet = require('./pet')
const Notification = require('./notification')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
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
    pets: [Pet],
    notification: [Notification],
    static: {
        type: {
            type: String, 
            enum: ['Point']
            /*required: true */
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
            default: []
            /*required: true */
        }
    },
    dinamic: {
        type: {
            type: String, 
            enum: ['Point']
            /*required: true */
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
            default: []
            /*required: true */
        }
    }

})