const mongoose = require('mongoose')
const { user } = require('./schemas')
const { vehicle } = require('./schemas')
const { property } = require('./schemas')
const { card } = require('./schemas')
const { phone } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Vehicle: mongoose.model('Vehicle', vehicle),
    Property: mongoose.model('Property', property),
    Card: mongoose.model('Card', card),
    Phone: mongoose.model('Phone', phone)
}