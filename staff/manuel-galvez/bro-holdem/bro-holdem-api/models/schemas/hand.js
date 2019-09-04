const { Schema, ObjectId } = require('mongoose')
const playerSchema = require('./player')
const roundSchema = require('./round')

module.exports = new Schema({

    pot: {
        type: Number,
        required: true
    },

    dealer_pos: {
        type: Number,
        required: true
    },

    bb_pos: {
        type: Number,
        required: true
    },

    sb_pos: {
        type: Number,
        required: true
    },

    turn_pos: {
        type: Number,
        required: true
    },

    game: [{ type: ObjectId, ref: 'User' }],
    table_cards: [{ type: ObjectId, ref: 'Deck' }],
    players: [playerSchema],
    round: [roundSchema]
})

