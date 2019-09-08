const { Schema, ObjectId } = require('mongoose')
// const playerSchema = require('./player')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    points: {
        type: Number,
       
    },

    owner: { type: ObjectId, ref: 'User'},

    players: [{ type: Number, ref: 'Player'}]
})

