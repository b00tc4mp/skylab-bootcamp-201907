const mongoose = require('mongoose')
const { user = require('../data/schema') }

module.exports = {
    User: mongoose.model('User', user)
}