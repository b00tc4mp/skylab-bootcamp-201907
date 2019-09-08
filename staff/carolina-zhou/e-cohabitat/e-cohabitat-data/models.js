const mongoose = require('mongoose')
const { user, space, task, comment } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Space: mongoose.model('Space', space),
    Task: mongoose.model('Task', task),
    Comment: mongoose.model('Comment', comment)
}

