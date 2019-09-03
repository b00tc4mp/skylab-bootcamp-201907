const mongoose = require('mongoose')
const { user, product, conversation, mail } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Product: mongoose.model('Product', product),
    Conversation: mongoose.model('Conversation', conversation),
    Mail: mongoose.model('Mail', mail)
}