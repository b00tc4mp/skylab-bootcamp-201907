const {validate } = require('footcamp-utils')
const { models: { User,  League } } = require('footcamp-data')

 /**
 * 
 * @param {*} id 
 * @param {*} code 
 *   
 * @returns {Promise}
*/

module.exports = function(id, code) {
   
  
    validate.string(id, 'id')
    validate.string(code, 'code')
      
    return (async () => {
        
        const user = await User.findById(id)

        if (!user) throw new Error(`User with id ${id} does not exist`)

        const leagues = await League.findOne({ code }).lean()
        
        if (!leagues) throw Error(`league with code ${ code } does not exist`)
        
        //check the team in the database and select name, participants and teams
        let name, codes, teams
        let participants = []
        debugger
        name= leagues.name
        codes = leagues.code
        leagues.participants.forEach(element => {
            participants.push(element.toString())
            
        })

        teams = leagues.team

        let league = { name, code: codes, participants, teams}

        return league

    })()
}
