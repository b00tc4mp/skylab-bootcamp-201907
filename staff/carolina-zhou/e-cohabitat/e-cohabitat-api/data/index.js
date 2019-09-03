const mongoose = require('mongoose')
const { user, space } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Space: mongoose.model('Space', space)
}