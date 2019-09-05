const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose

module.exports = new Schema({
    move: {
        type: [String],
        enum: ['call', 'bet', 'raise', 'check', 'fold', 'leave'],
        required: true
    },

    player_stack: {
        type: Number,
        required: true,
    },

    player_pos: {
        type: Number,
        required: true,
    },

    player_cards: {
        type: Array,
        required: true,
    },

    bet_amount: {
        type: Number,
        required: true
    },

    player: { type: ObjectId, ref: 'Player' },
    game: { type: ObjectId, ref: 'Game' },
    hand: { type: ObjectId, ref: 'Hand' }
})
