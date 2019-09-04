const mongoose = require('mongoose')
const { user, cache } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Pet: mongoose.model('Cache', cache)
}