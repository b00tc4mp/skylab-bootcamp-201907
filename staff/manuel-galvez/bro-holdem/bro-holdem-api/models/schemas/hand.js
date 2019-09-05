const { Schema } = require('mongoose')

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

    round: {
        type: Number,
        required: true
    },

    used_cards: {
        type: Array,
        default: []
    },

    table_cards: {
        type: Array,
        default: []
    }
})

