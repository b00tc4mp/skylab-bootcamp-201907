const mongoose = require('mongoose')
const validate = require('../../../utils/validate')
const { Game, Player } = require('../../../models')

/**
* 
* @param {*} name 
* @param {*} max_players 
* @param {*} initial_stack 
* @param {*} initial_bb 
* @param {*} initial_sb 
* @param {*} blinds_increase 
* @param {*} hostId 
* 
* @returns {Promise}
*/

module.exports = function (name, max_players, initial_stack, initial_bb, initial_sb, blinds_increase, hostId) {

    validate.string(name, 'name')
    validate.number(max_players, 'max_players')
    validate.number(initial_stack, 'initial_stack')
    validate.number(initial_bb, 'initial_bb')
    validate.number(initial_sb, 'initial_sb')
    validate.number(blinds_increase, 'blinds_increase')
    validate.objectId(hostId, 'host ID')

    return (async () => {
        const game = await Game.findOne({ name })
        if (game) throw Error('Game already exists.')

        // Create game
        const newGame = new Game({ name, max_players, initial_stack, initial_bb, initial_sb, blinds_increase })
        const gameId = newGame.id
        newGame.host = hostId

        // Create new instance of player
        const newPlayer = new Player({
            position: newGame.players.length,
            current_stack: newGame.initial_stack,
            cards: [],
            in_hand: false,
            bet_amount: 0
        })
        newPlayer.user = hostId

        // Add player to game
        newGame.players.push(newPlayer)

        await newGame.save()
        return gameId
    })()
}
