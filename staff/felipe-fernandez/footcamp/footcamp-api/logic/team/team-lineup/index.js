const {validate} = require('footcamp-utils')
const { models: { User,  League, Team , Player } } = require('footcamp-data')

 /**
 * Retrieves a static lineup for the user's team
 *
 * @param {*} id 
 * @param {*} leagueId 
 * @param {*} teamId 
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

        const team = await Team.findOne({_id: teamId })

        if (!team) throw Error(`Team with name ${ teamId } does not exist`)

        //if the team exists extract 11 players: 1 goalkeeper, 4 defenders, 4 midfielders, 2 strikers

        //get all the players in the team
        let players = await Promise.all(team.players.map((id_player) =>
            Player.findOne({_id: id_player})
         ))

        //select all the players by position and splice 1 goalkeeper, 4 defenders, 4 midfielders, 2 strikers
        let goalkeepers = players.filter(player => player.position === 1).splice(0,1) 

        let defenders = players.filter(player => player.position === 2).splice(0,4)
        let midfielders = players.filter(player => player.position === 3).splice(0,4)
        let strikers = players.filter(player => player.position === 4).splice(0,2)

        //extract the id of the players
        
        let idsGoalkeeper = [], idsDefender=[], idsMidfielder=[], idsStriker= []
        idsGoalkeeper = goalkeepers.map((player)=> player._id.toString())
        idsDefender = defenders.map((player)=> player._id.toString())
        idsMidfielder = midfielders.map((player)=> player._id.toString())
        idsStriker = strikers.map((player)=> player._id.toString())
 
        let lineup=[...idsGoalkeeper, ...idsDefender, ...idsMidfielder, ...idsStriker]
        
        lineup.forEach((element, i) => {
            team.players.push(element)
        })
        
        // await league.save()
        await team.save()
 
        return lineup

    })()
}
