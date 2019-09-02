const mongoose = require('mongoose')
const { user, product, conversation, message } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Product: mongoose.model('Product', product),
    Conversation: mongoose.model('Conversation', conversation),
    Message: mongoose.model('Message', message)
}