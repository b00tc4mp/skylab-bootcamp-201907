const {validate} = require('footcamp-utils')
const { models: { User,  League, Team } } = require('footcamp-data')

 /**
 * Retrieves a team by name within the league and linked to the user 
 *
 * @param {*} id 
 * @param {*} leagueId 
 * @param {*} name 
 * 
 *  
 * @returns {Promise}
*/

module.exports = function(id, leagueId, teamId) {
   
    validate.string(id, 'id')
    validate.string(leagueId, 'league Id')
    validate.string(teamId, 'team id')
   
    return (async () => {
    
        const user = await User.findById(id)

        if (!user) throw new Error(`User with id ${id} does not exist`)

        const league = await League.findOne({ _id: leagueId })

        if (!league) throw Error(`League with code ${ leagueId } does not exist`)

        const findTeam = await Team.findOne({_id: teamId })

        if (!findTeam) throw Error(`Team with name ${ teamId } does not exist`)

         //check the team in the database and select name, owner and players ids
        let name_team, points, owner
        let players = []
        
        name_team= findTeam.name
        points = findTeam.points
        owner = findTeam.owner.toString()
        findTeam.players.forEach(element => {
            players.push(element.toString())
            
        })
        
        let team = { name_team, points, owner, players}

        return team

    })()
}
