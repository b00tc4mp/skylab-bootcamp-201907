const mongoose = require('mongoose')
const { user, city, poll } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    City: mongoose.model('City', city),
    Poll: mongoose.model('Poll', poll)
}