const {validate} = require('footcamp-utils')
const { models: { User, League } } = require('footcamp-data')
 
/**
 * Leave league by league id
 * 
 * @param {string} userId 
 * @param {string} leagueId
 * 
 * 
 * @returns {Promise}
*/
module.exports = function(userId, leagueId) {

    validate.string(userId, 'User id')
    validate.string(leagueId, 'League Id')
   

    return (async()=>{

        const user = await User.findById(id)

        if (!user) throw new Error(`User with id ${id} does not exists`)
        
        const leagueFounded = user.leagues.find(element => element.toString() === leagueId)
        const leagueIndex = user.leagues.findIndex(element => element.toString() === leagueId)
        if(!leagueFounded) throw Error(`League with id ${ leagueId } does not exists`)
        user.leagues.splice(leagueIndex, 1)
       
        await user.save()
       
    })()
    
}