const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = new Schema({

    cityId: {
        type: String,
        required: true
    },

    fullname: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    documentId: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },

    imgDocId: {
        type: String,
        required: false
    },

    password: {
        type: String,
        required: true
    },

    participatedPolls: {
        type: Array,
        required: false
    },

    proposedPolls: {
        type: Array,
        required: false
    },

    userRole: {
        type: String,
        required: true,
        enum: ['citizen', 'admin'],
        default: 'citizen'
    }
})