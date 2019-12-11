const {validate} = require('footcamp-utils')
const { models: { User,  League, Team } } = require('footcamp-data')

 /**
 * Updates the player received by parameters
 *
 * @param {*} id 
 * @param {*} leagueId 
 * @param {*} teamId 
 * 
 *  
 * @returns {Promise}
*/

module.exports = function( id, leagueId, teamId, id1, id2) {
   
    validate.string(id, 'id')
    validate.string(leagueId, 'league Id')
    validate.string(id1, 'id1')
    validate.string(id2, 'id2')
   
    return (async () => {
    
        const user = await User.findById(id)

        if (!user) throw new Error(`User with id ${id} does not exist`)

        const league = await League.findOne({ _id: leagueId })

        if (!league) throw Error(`League with id ${ leagueId } does not exist`)

        const findTeam = await Team.findOne({_id: teamId })

        if (!findTeam) throw Error(`Team with id ${ teamId } does not exist`)

        findTeam.lineup.splice(id1, 1, id2)
        await findTeam.save()



    })()
}
