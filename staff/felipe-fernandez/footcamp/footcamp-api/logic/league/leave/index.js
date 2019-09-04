const {validate} = require('footcamp-utils')
const { models: { User, League } } = require('footcamp-data')
 
/**
 * Leave league by league id
 * 
 * @param {string} userId 
 * @param {string} leag
 * @param {string} password 
 * 
 * @returns {Promise}
*/
module.exports = function(userId, leagueId) {

    validate.string(userId, 'User id')
    validate.string(leagueId, 'League Id')
   

    return (async()=>{

        const user = await User.findById(id)

        if (!user) throw new Error(`user with id ${id} does not exists`)

        const league = await League.findOne({ leagueId })

        if (league) throw Error(`league with name ${ name } does not exists`)

        
        users.leagues.push(leagues)
        users.leagues.push(leagues2)
            
        await users.save()

        // const user =  await League.deleteOne({ _id: id, email, password })

        // if (!user.deletedCount) throw Error(`There was an error unregistering the user`)
       
    })()
    
}