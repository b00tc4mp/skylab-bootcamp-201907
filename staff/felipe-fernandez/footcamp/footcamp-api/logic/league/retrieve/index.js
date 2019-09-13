const {validate } = require('footcamp-utils')
const { models: { User,  League } } = require('footcamp-data')

 /**
 * Retrieve the league information with all participants and their teams
 *
 * @param {*} id 
 * @param {*} leagueid 
 *   
 * @returns {Promise}
*/

module.exports = function(id, leagueId) {
   
  
    validate.string(id, 'id')
    validate.string(leagueId, 'league id')
      
    return (async () => {
        debugger
        const user = await User.findById(id)

        if (!user) throw new Error(`User with id ${id} does not exist`)

        const leagues = await League.findOne({_id: leagueId})
        
        if (!leagues) throw Error(`league with code ${ leagueId } does not exist`)
        debugger
        //check the team in the database and select name, participants and teams
        let name, codes, teams

        let participants = []
        
        name= leagues.name
        codes = leagues.code
        id= leagues._id
        leagues.participants.forEach(element => {
            participants.push(element.toString())
            
        })
    
        teams = leagues.team

        let league = { id, name, code: codes, participants, teams}

        return league

    })()
}
