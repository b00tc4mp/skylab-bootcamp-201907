const {validate, random: { number }} = require('footcamp-utils')
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
        debugger
        const user = await User.findById(id)

        if (!user) throw new Error(`user with id ${id} does not exists`)

        const league = await League.findOne({ name })

        if (league) throw Error('League exists!')
        
        const newLeague = new League({name, code})

        newLeague.admin.push(id)

        const initialCode = number(100000,200000)

        newLeague.code = initialCode
   
        await newLeague.save()
        
        return newLeague
    })()
}
