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

module.exports = function(id, code) {
   
    validate.string(id, 'id')
    validate.string(code, 'code')
   
    return (async () => {
        
        const user = await User.findById(id)

        if (!user) throw new Error(`User with id ${id} does not exist.`)
        
        const league = await League.findOne({ code }).lean()
        if (!league) throw Error(`cannot find league with code ${ code }`)

        user.leagues.push(league.id)
        await user.save()
    })()
}
