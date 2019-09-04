const {validate } = require('footcamp-utils')
const { models: { User,  League } } = require('footcamp-data')

 /**
 * 
 * @param {*} id 
 * @param {*} name 
 * @param {*} code 
 *  
 * @returns {Promise}
*/

module.exports = function(id, name, code) {
   
    let leagueId

    validate.string(id, 'id')
    validate.string(name, 'name')
    validate.string(code, 'code')
   
    return (async () => {
        
        const user = await User.findById(id)

        if (!user) throw new Error(`user with id ${id} does not exists`)

        const league = await League.findOne({ name })
       
        if (!league) throw Error(`league with name ${ name } does not exists`)

        debugger
        if(!league.id.includes(code))throw Error(`code with number ${code} does not exists`)

        leagueId= league.id

        user.leagues.push(leagueId)

        await user.save()
        
        return league

    })()
}
