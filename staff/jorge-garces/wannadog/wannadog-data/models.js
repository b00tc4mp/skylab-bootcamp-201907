const mongoose = require('mongoose')
const { user, dog, chat, message, wish } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Dog: mongoose.model('Dog', dog),
    Chat: mongoose.model('Chat', chat),
    Message: mongoose.model('Message', message),
    Wish: mongoose.model('Wish', wish)
}