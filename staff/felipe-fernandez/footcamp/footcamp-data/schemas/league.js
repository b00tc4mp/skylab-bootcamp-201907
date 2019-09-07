const { Schema, ObjectId } = require('mongoose')
const teamSchema = require('./team')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    code: {type: String, required: true },

    participants: [{ type: ObjectId, ref: 'User' }],

    team: [teamSchema]
})

