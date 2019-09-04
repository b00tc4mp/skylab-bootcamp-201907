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
   
    
    validate.string(id, 'id')
    validate.string(name, 'name')
    validate.string(code, 'code')
   
    return (async () => {
        
        const user = await User.findById(id)

        if (!user) throw new Error(`user with id ${id} does not exists`)

        const league = await League.findOne({ name })
        
        if (!league) throw Error(`league with name ${ name } does not exists`)
        
        //check if the code is included in league id because the code was generated with the id of the league
        if(!league.id.includes(code))throw Error(`code with number ${code} does not exists`)
        
        user.leagues.push(league.id)

        await user.save()
           
        
    })()
}
