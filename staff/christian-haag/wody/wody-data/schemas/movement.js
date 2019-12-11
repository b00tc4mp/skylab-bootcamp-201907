const mongoose = require('mongoose')

const { Schema } = mongoose

module.exports = new Schema({
    movement: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true
    },
    restime: {
        type: Number,
        required: true
    },
    bord: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    fitnesslevel: {
        type: String,
        required: true
    },
    weights: {
        type: String,
        required: false,
    },
    reps: {
        type: Array,
        required: false
    },
    url: {
        type: String,
        required: false,
        match: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

    }
})

