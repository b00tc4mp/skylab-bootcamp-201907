const {validate} = require('footcamp-utils')
const { models: { User,  League, Player } } = require('footcamp-data')

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

        //const teams = await League.findOne({ _id: leagueId }).populate("team.players", "totalPoints").lean()
        
        const teams = await League.findOne({ _id: leagueId }).populate("team.lineup", "totalPoints").lean()

        if (!league) throw Error(`League with id ${ leagueId } does not exist`)
        
        let allTeams = []

        let points = 0
        
        //create an array of objects with the properties of the teams to return
        debugger

        teams.team.forEach(element => {
            let  team = {
              id : element._id.toString(),
              name :  element.name,
              sumPoints :  element.lineup.forEach(point => {
                  
                      points += point.totalPoints
              
              }),
             
              totalPoints:  points,
              
              owner : element.owner.toString()
              }
              points=0
              allTeams.push(team)
          }

          )
          


          
        return allTeams

    })()
}
