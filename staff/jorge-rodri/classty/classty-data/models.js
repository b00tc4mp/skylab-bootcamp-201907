const mongoose = require('mongoose')
const { user, subject } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Subject: mongoose.model('Subject', subject)
 }