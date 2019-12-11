const mongoose = require('mongoose')

const { Schema } = mongoose

module.exports = new Schema({
    fav: {
        type: Boolean,
    },
    date: {
        type: Number,
        default: Date.now()
    },
    timefinish: {
        type: Number
    },
    sets: {
        type: Array,
    },
    movements: {
        type: Array
    }
})