const mongoose = require('mongoose')
const { user, cache } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Cache: mongoose.model('Cache', cache)
}