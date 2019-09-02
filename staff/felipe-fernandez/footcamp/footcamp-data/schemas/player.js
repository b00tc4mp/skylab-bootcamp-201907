const { Schema, ObjectId } = require('mongoose')
const playerSchema = require('./player')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    position: {
        type: String,
        required: true
    },

    points: {
        type: String,
        required: true
    },

    value: {
        type: Number,
        required: true
    },

    owner: [{ type: ObjectId, ref: 'User'}],

    player: [playerSchema]
})
