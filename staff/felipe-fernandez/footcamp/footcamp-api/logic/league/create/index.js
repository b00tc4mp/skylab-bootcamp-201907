const {validate} = require('footcamp-utils')
const { models: { User,  League } } = require('footcamp-data')

 /**
 * creates a league by name within the user passed as id
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

        const league = await League.findOne({ name })

        if (league) throw Error(`league with name ${ name } does not exists`)
        
        const newLeague = new League({name})
        
        //assign id of the user whho creates the league as admin of this league
        newLeague.admin = id
        
        //use the id of the league to extract a code that will need users to join this league
        const initialCode = newLeague.id.slice(2,8)
       
        newLeague.code = initialCode
        
        await newLeague.save()

    })()
}
