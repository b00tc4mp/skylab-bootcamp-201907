const { Schema, ObjectId } = require('mongoose')
const teamSchema = require('./team')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    admin: [{ type: ObjectId, ref: 'User'}],

    team: [teamSchema]
})

