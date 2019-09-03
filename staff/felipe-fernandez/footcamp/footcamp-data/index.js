const mongoose = require('mongoose')
const { user, league, team, player } = require('./schemas')
debugger
module.exports = {
    User: mongoose.model('User', user),
    League: mongoose.model('League', league)
    // Team: mongoose.model('Team', team),
    // Player: mongoose.model('Player', player)
}