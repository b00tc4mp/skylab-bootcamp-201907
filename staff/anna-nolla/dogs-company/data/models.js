const mongoose = require('mongoose')
const { user, pet } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Pet: mongoose.model('Pet', pet)
}