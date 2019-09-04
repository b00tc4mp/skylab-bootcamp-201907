const {validate, random: { number }} = require('footcamp-utils')
const { models: { User,  League } } = require('footcamp-data')

 /**
 * 
 * @param {*} id 
 * @param {*} name 
 *  
 * @returns {Promise}
*/

module.exports = function(id, name, code) {
   
    let leagueId

    validate.string(id, 'id')
    validate.string(name, 'name')
   
    return (async () => {
        
        const user = await User.findById(id)

        if (!user) throw new Error(`user with id ${id} does not exists`)

        const league = await League.findOne({ name })

        
        code = league.id.slice(2,8)

        debugger

        if (!league) throw Error(`league with name ${name} does not exists`)
        // if (league.code != code) throw Error(`league with name ${name} does not exists`)
        
        user.leagues.push(leagueId)

        await user.save()
        
        return league

    })()
}
