const mongoose = require('mongoose')
const { user, pet, chat, message, notification } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Pet: mongoose.model('Pet', pet),
    Chat: mongoose.model('Chat', chat),
    Message: mongoose.model('Message', message),
    Notification: mongoose.model('Notification', notification)
}