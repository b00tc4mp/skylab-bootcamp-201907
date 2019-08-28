
const mongoose = require('mongoose')
const {user} = require('./schemas')

module.exports = {
    User: mongoose.model('User', user)
}