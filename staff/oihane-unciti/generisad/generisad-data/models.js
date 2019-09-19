const mongoose = require('mongoose')
const { user, advertisement, merchant, mail } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Advertisement: mongoose.model('Advertisement', advertisement),
    Merchant: mongoose.model('Merchant', merchant),
    Mail: mongoose.model('Mail', mail)
}