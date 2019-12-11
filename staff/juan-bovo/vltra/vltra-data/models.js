const mongoose = require('mongoose')
const { user, post, comment } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Post: mongoose.model('Post', post),
    Comment: mongoose.model('Comment', comment)
}