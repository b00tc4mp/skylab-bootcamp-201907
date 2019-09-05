const mongoose = require('mongoose')
const validate = require('../../../utils/validate')
const { Game, Player, Card, Hand } = require('../../../models')

/**
* 
* @param {*} gameId
* 
* @returns {Promise}
*/

module.exports = function (gameId) {

    validate.objectId(gameId, 'Game ID')

    return (async () => {

        // Find game
        const game = await Game.findById(gameId)
        if (!game) throw Error('Game does not exist.')

        // Check if there are enough participants to start a game
        if (game.players.length < 2) throw Error('Not enough players to start a game.')

        // Change game status
        game.status = 'playing'

        // Deal first hand
        const newHand = new Hand({
            pot: 0,
            dealer_pos: 0,
            bb_pos: game.players.length - 1,
            sb_pos: game.players.length - 2,
            turn_pos: 1,
            round: 0
        })

        // Deal flop cards
        let randomNum
        let match
        for (i = 0; i < 3; i++) {
            do {
                randomNum = Number((Math.random() * (52 - 1) + 1).toFixed())
                match = newHand.used_cards.includes(randomNum)
            } while (match)
            newHand.table_cards.push(randomNum)
            newHand.used_cards.push(randomNum)
        }

        // Deal players' cards
        game.players.forEach(player => {
            for (i = 0; i < 2; i++) {
                do {
                    randomNum = Number((Math.random() * (52 - 1) + 1).toFixed())
                    match = newHand.used_cards.includes(randomNum)
                } while (match)
                player.cards.push(randomNum)
                newHand.used_cards.push(randomNum)
            }
            player.in_hand = true
        })

        game.hands.push(newHand)

        await game.save()

    })()
}
