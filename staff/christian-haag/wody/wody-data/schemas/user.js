const mongoose = require('mongoose')

const { Schema } = mongoose

const workout = require('./workout')

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
    current: [workout],
    historic: [workout],
    gender: {
        type: String,
        enum: ['male', 'female', 'unset'],
        default: 'unset'
    },
    birthday: {
        type: String,
        default: 'unset'
    },
    height: {
        type: Number,
        default: 0
    },
    weight: {
        type: Number,
        default: 0
    },
    goal: {
        type: String,
        enum: ['lose', 'fit', 'gain', 'unset'],
        default: 'unset'

    },
    fitnesslevel: {
        type: String,
        enum: ['low', 'mid', 'high', 'unset'],
        default: 'unset'
    }

})

