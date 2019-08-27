const mongoose = require('mongoose')
const { user, card, vehicle, property } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Card: mongoose.model('Card', card),
    Vehicle: mongoose.model('Vehicle', vehicle),
    Property: mongoose.model('Property', property)
}