const mongoose = require('mongoose')
const { user, workout, movement } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Workout: mongoose.model('Workout', workout),
    Movement: mongoose.model('Movement', movement)
}