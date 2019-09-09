const { Schema, ObjectId } = require('mongoose')

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

    realTeam: {
        type: String,
        required: true
    },

    position: {
        type: Number,
        required: true
    },

    pointsPerGame: {
        type: Number,
        required: true
    },

    totaPoints: {
        type: Number,
        required: true
    },

    yellowCards: {
        type: Number,
        required: true
    },
    
    redCards: {
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
