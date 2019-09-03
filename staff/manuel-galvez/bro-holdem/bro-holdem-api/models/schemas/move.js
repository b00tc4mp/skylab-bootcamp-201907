const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose

module.exports = new Schema({
    move: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true,
    },

    bet_amount: {
        type: Number,
        required: true
    },

    player: [{ type: ObjectId, ref: 'Player' }]
})
