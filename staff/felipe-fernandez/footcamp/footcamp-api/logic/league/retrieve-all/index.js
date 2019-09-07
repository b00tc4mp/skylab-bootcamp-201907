const {validate } = require('footcamp-utils')
const { models: { User,  League } } = require('footcamp-data')

 /**
 * 
 * @param {*} id 
 * @param {*} code 
 *   
 * @returns {Promise}
*/

module.exports = function(id) {
   
    
    validate.string(id, 'id')
    // validate.string(code, 'code')
    let idLeague
    return (async () => {
        
        const user = await User.findById(id)

        if (!user) throw new Error(`User with id ${id} does not exist`)
        
        let leagues = user.leagues.map(league=>  idLeague.push(league) )
        
        //get all the players in the team
        let leagues2 = await Promise.all(ids(() =>
            League.findOne({ ids }).select('-__v').lean()
            
         ))
        
         leagues.map(league => {
            league.id = league._id.toString()
            delete league._id
        })

         return leagues
        

    })()
}
