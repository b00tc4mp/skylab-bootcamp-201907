const { Schema, ObjectId } = require('mongoose')
// const playerSchema = require('./player')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    playerId: {
        type: Number,
        required: true
    },

    real_team: {
        type: String,
        required: true
    },

    position: {
        type: Number,
        required: true
    },

    points_per_game: {
        type: Number,
        required: true
    },

    total_points: {
        type: Number,
        required: true
    },

    yellow_cards: {
        type: Number,
        required: true
    },
    
    red_cards: {
        type: Number,
        required: true
    },

    goals: {
        type: Number,
        required: true
    },

    minutes: {
        type: Number,
        required: true
    },

    photo: {
        type: String,
        
    },

    cost: {
        type: Number,
        required: true
    },
    
})
