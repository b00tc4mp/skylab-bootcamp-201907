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
        debugger
        let allLeagues = []

        //create an array of objects with the properties of the teams to return
        leagues.forEach(element => {
          let  league = {
            name :  element.name,
            points : element.points ? element.points: 0,
            
            }
            allLeagues.push(league)
        })

        await user.save()
        
        return allLeagues

    })()
}
