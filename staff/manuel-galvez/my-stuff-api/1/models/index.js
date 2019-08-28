const mongoose = require('mongoose')
const { user, vehicle, property, card } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Vehicle: mongoose.model('Vehicle', vehicle),
    Property: mongoose.model('Property', property),
    Card: mongoose.model('Card', card)
}