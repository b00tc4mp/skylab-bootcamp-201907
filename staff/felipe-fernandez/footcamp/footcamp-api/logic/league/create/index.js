const {validate} = require('footcamp-utils')
const { models: { User,  League } } = require('footcamp-data')

 /**
 * creates a league by name within the user passed as id
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

        const leagues = await League.findOne({ name })

        if (leagues) throw Error(`league with name ${ name } alredy exists`)
     
        const league = new League({name, code})

        league.participants.push(id)
            
        await league.save()

    })()
}
