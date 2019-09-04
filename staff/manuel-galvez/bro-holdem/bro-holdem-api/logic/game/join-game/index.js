const validate = require('../../../utils/validate')
const { Game, Player } = require('../../../models')

/**
 * 
 * @param {*} gameId 
 * 
 * @returns {Promise}
 */

module.exports = function (gameId) {

    validate.string(gameId, 'Game ID')

    return (async () => {

        // Retrieve game using access token
        const game = await Game.findOne({ _id: gameId })
        if (!game) throw Error(`Invalid game access token.`)
        debugger

        // Check is room is full
        if (game.players.length === game.max_players) throw Error(`Game room is full.`)

        // Push new player to game.players
        const newPlayer = new Player({
            position: game.players.length + 1,
            current_stack: game.initial_stack,
            cards: [],
            in_game: true,
            in_hand: false
        })

        game.players.push(newPlayer)
        Promise.all([newPlayer.save(), game.save()]).then(() => { })
    })()
}