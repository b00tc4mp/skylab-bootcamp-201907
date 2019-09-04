const validate = require('../../../utils/validate')
const { Game, Player, User } = require('../../../models')

/**
 * 
 * @param {*} gameId 
 * 
 * @returns {Promise}
 */

module.exports = function (gameId, userId) {

    validate.objectId(gameId, 'Game ID')
    validate.objectId(userId, 'User ID')

    return (async () => {
        // Check if user exists
        const user = await User.findById(userId)
        if (!user) throw Error(`User with id ${userId} does not exist.`)

        // Retrieve game using access token
        const game = await Game.findById(gameId)
        if (!game) throw Error(`Game with id ${gameId} does not exist.`)

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
        newPlayer.user = userId

        game.players.push(newPlayer)
        await game.save()
    })()
}