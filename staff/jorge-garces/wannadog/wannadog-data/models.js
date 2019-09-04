const mongoose = require('mongoose')
const { user, dog, conversation, message, wish } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Dog: mongoose.model('Dog', dog),
    Conversation: mongoose.model('Conversation', conversation),
    Message: mongoose.model('Message', message),
    Wish: mongoose.model('Wish', wish)
}