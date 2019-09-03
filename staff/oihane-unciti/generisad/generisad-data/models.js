const mongoose = require('mongoose')
const { user, advertisement, conversation, mail } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Advertisement: mongoose.model('Advertisement', advertisement),
    Conversation: mongoose.model('Conversation', conversation),
    Mail: mongoose.model('Mail', mail)
}