const {validate} = require('footcamp-utils')
const { models: { User,  League, Team } } = require('footcamp-data')

 /**
 * Retrieves all the leagues of the user where he's a participant

 * @param {*} id 
 * 
 *  
 * @returns {Promise}
*/

module.exports = function(id) {
   
    validate.string(id, 'id')
    
    return (async () => {
        
        const user = await User.findById(id)

        if (!user) throw new Error(`User with id ${id} does not exist`)

        const leagues = await Promise.all(user.leagues.map(league => league))
        
                
        await user.save()
        debugger
        return leagues[0]

    })()
}
