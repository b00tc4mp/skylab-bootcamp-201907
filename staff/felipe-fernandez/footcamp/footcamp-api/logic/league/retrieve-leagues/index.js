const {validate } = require('footcamp-utils')
const { models: { User } } = require('footcamp-data')

 /**
 * 
 * @param {*} id 
 * @param {*} leaguId 
 * 
 *   
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'id')

    let leagueIds = []

    return (async () => {
        const user = await User.findById(id)
        if (!user) throw Error(`User with id ${id} does not exist.`)
        
        user.leagues.forEach(league => {
            leagueIds.push(league.toString())
        })
      
        return leagueIds
    })()



    // validate.string(id, 'id')

    // let codes
      
    // return (async () => {
        
        // const user = await User.findById(id).lean()

        // if (!user) throw new Error(`user with id ${id} does not exists`)

        // user.leagues.forEach(league => {
        //     codes.push(league._id.toString().slice(2,8))

        // })



        // debugger

        //  const getLeagues= user.leagues.map(league=> {
        //     let name, code, admin, teams 
        //         name = league.name,
        //         code = league.codes, 
        //         teams =  league.teams

        //     return {name, code, admin, teams}
            
        // })
        
        
        // return getLeagues

   
    // })()
}
