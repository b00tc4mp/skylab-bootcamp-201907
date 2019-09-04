const {validate } = require('footcamp-utils')
const { models: { User,  League } } = require('footcamp-data')

 /**
 * 
 * @param {*} id 
 * @param {*} name 
 *   
 * @returns {Promise}
*/

module.exports = function(id, name) {
   
  
    validate.string(id, 'id')
    validate.string(name, 'name')
      
    return (async () => {
        
        const user = await User.findById(id)

        if (!user) throw new Error(`user with id ${id} does not exists`)

        const league = await League.findOne({ name }).lean()
        
        if (!league) throw Error(`league with name ${ name } does not exists`)
        
        league.id = league._id.toString()
        
        delete league._id
        delete league.__v

        return league

    })()
}
