const mongoose = require('mongoose')
const { user } = require('./schema')

module.exports = {
    User: mongoose.model('User', user)
}