const mongoose = require('mongoose')
const { deck, game, hand, move, player, round, user } = require('./schemas')

module.exports = {
    Deck: mongoose.model('Deck', deck),
    Game: mongoose.model('Game', game),
    Hand: mongoose.model('Hand', hand),
    Move: mongoose.model('Move', move),
    Player: mongoose.model('Player', player),
    Round: mongoose.model('Round', round),
    User: mongoose.model('User', user)
}