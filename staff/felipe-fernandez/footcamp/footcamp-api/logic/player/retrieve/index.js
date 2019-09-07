const {validate} = require('footcamp-utils')
const { models: {  Team, Player } } = require('footcamp-data')

 /**
 * retrieves players from his own team
 * @param {*} name 
 * @param {*} id_player 
 *  
 * @returns {Promise}
*/

module.exports = function(name, player_id) {

   
    validate.string(name, 'name')
    validate.number(player_id, 'player id')
   
   
    return (async () => {

                
        const team = await Team.findOne({ name })

        if (!team) throw Error(`Team with name ${ name } does not exist`)

        const player = await Player.findOne({ player_id }).lean()

        if (!player) throw Error(`Player with id ${ player_id } does not exist`)
        

        return player
        
    })()
}
