const mongoose = require('mongoose')
const { user, cache, comment, photo } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Cache: mongoose.model('Cache', cache),
    Comment: mongoose.model('Comment', comment),
    Photo: mongoose.model('Photo', photo)
}