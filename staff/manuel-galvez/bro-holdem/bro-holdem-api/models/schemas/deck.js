const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose

module.exports = new Schema({
    card_code: {
        type: String,
        required: true
    },

    card_image: {
        type: String,
        required: true,
    },

    player: [{ type: ObjectId, ref: 'Player' }]
})
