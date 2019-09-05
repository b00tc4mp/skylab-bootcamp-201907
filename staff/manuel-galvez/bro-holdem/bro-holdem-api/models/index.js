const mongoose = require('mongoose')
const { card, game, hand, move, player, user } = require('./schemas')

module.exports = {
    Card: mongoose.model('Card', card),
    Game: mongoose.model('Game', game),
    Hand: mongoose.model('Hand', hand),
    Move: mongoose.model('Move', move),
    Player: mongoose.model('Player', player),
    User: mongoose.model('User', user)
}