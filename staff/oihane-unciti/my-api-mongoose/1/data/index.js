const mongoose = require('mongoose')
const { userSchema } = require('./schemas')

const models = {
    User: mongoose.model('User', userSchema),
}

module.exports = { mongoose, models }