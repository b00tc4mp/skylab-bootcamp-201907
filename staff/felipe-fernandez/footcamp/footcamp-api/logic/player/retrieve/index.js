const {validate} = require('footcamp-utils')
const { models: {  User, Player } } = require('footcamp-data')

 /**
 * retrieves players from his own team
 * @param {*} id 
 * @param {*} name 
 * @param {*} id_player 
 *  
 * @returns {Promise}
*/

module.exports = function(id, code, player_id) {

    validate.string(id, 'id')
    validate.string(code, 'code')
    validate.number(player_id, 'player id')
   
   
    return (async () => {

                
        const user = await User.findById(id)

        if (!user) throw new Error(`User with id ${id} does not exist`)

        const player = await Player.findOne({ player_id}).lean()
        debugger
        if (!player) throw Error(`Player with id ${ player_id } does not exist`)
        
        player.id = player._id.toString()
        delete player._id

        return player
        
    })()
}
