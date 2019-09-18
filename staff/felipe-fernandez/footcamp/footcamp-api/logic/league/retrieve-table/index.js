const {validate} = require('footcamp-utils')
const { models: { User,  League, Player, Team } } = require('footcamp-data')

 /**
 * Retrieves all the leagues of the user where he's a participant

 * @param {*} id 
 * @param {*} league id 
 *
 *  
 * @returns {Promise}
*/

module.exports = function(id, leagueId) {
   
    validate.string(id, 'id')
    validate.string(leagueId, 'league id')
    
    return (async () => {
        
        const user = await User.findById(id)

        if (!user) throw new Error(`User with id ${id} does not exist`)

        const league = await League.findOne({ _id: leagueId })

        const teams = await League.findOne({ _id: leagueId }).populate("team.lineup", "totalPoints").lean()

        if (!league) throw Error(`League with id ${ leagueId } does not exist`)
        
        let allTeams = []

        let points = 0
        
        //create an array of objects with the properties of the teams to return
        let t
        for (let element of teams.team) {
            t = await Team.findById(element._id.toString()).populate("lineup", "totalPoints").lean()
            let  team = {
                id : t._id.toString(),
                name :  t.name,
                sumPoints :  t.lineup.forEach(point => {
                    points += point.totalPoints
                }),
                owner : t.owner.toString(),
                totalPoints: points
            }
            points=0
            allTeams.push(team)
        }
        
        return allTeams

    })()
}
