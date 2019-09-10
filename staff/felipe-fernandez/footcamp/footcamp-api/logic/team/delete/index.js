const {validate} = require('footcamp-utils')
const { models: { User,  League, Team } } = require('footcamp-data')

 /**
 * Deletes a team by name and the code of the league what he belongs
 *
 * @param {*} id 
 * @param {*} leagueId 
 * @param {*} teamId 
 * 
 * 
 *  
 * @returns {Promise}
*/

module.exports = function(id, leagueId, teamId) {
   
    validate.string(id, 'id')
    validate.string(leagueId, 'league Id')
    validate.string(teamId, 'team Id')
   
    return (async () => {
   
        const user = await User.findById(id)

        if (!user) throw new Error(`User with id ${id} does not exist`)

        const league = await League.findOne({ _id: leagueId })

        if (!league) throw Error(`League with code ${ leagueId } does not exist`)

        const team = await Team.findOne({ _id: teamId })

        if (!team) throw Error(`Team with name ${ teamId } does not exist`)

        const teamDeleted =  await Team.deleteOne({ _id: teamId })
        
        if (teamDeleted.deletedCount===0) throw Error(`There was an error deleting the team`)
     

    })()
}
