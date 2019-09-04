const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose
const playerSchema = require('./player')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    max_players: {
        type: Number,
        required: true
    },

    initial_stack: {
        type: Number,
        required: true
    },

    initial_bb: {
        type: Number,
        required: true,
    },

    initial_sb: {
        type: Number,
        required: true
    },

    blinds_increase: {
        type: Number,
        required: true,
        default: false
    },

    host: { type: ObjectId, ref: 'User' },
    players: [playerSchema]
})
