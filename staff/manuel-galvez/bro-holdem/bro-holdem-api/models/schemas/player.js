const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
    position: {
        type: Number,
        required: true
    },

    current_stack: {
        type: Number,
        required: true
    },
    cards: {
        type: Array,
        required: true
    },
    in_game: {
        type: Boolean,
        required: true
    },
    in_hand: {
        type: Boolean,
        required: true
    },

    user: { type: ObjectId, ref: 'User' }
})
