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

        const league = await League.findOne({ code }).lean()
        
        if (!league) throw Error(`league with code ${ code } does not exist`)
        
        //check the team in the database and select name, participants and teams
        let name, codes, teams
        let participants = []
        debugger
        name= league.name
        codes = league.code
        league.participants.forEach(element => {
            participants.push(element.toString())
            
        })

        teams = league.team

        let getleagues = { name, code: codes, participants, teams}

        return getleagues

    })()
}
