const {validate } = require('footcamp-utils')
const { models: { User } } = require('footcamp-data')

 /**
 * 
 * @param {*} id 
 * 
 *   
 * @returns {Promise}
*/

module.exports = function(id) {
   
  
    validate.string(id, 'id')
      
    return (async () => {
        
        const user = await User.findById(id).lean()

        if (!user) throw new Error(`user with id ${id} does not exists`)
        debugger 
        const getLeagues= user.leagues.map(league=> {
            let name, code, admin, teams 
                name = league.name,
                code = league.code, 
                admin= league.admin,
                teams=  league.teams
            return {name, code, admin, teams}
        })
        
        debugger
        return getLeagues

    })()
}
