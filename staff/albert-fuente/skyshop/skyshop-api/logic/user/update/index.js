const {validate} = require('skyshop-utils')
const { models:{User} } = require('skyshop-data')
const bcrypt = require('bcryptjs')



/**
 * 
 * @param {*} id
 * @param {*} fieldsToUpdate 
 * 
* @returns {Promise}
*/

module.exports = function(id, fieldsToUpdate) {
    validate.string(id, 'id')
    if(!fieldsToUpdate)throw Error('No field to update provided')
    return(async()=>{

        if(fieldsToUpdate.password){
            const hash = await bcrypt.hash(fieldsToUpdate.password, 10)
            
            fieldsToUpdate.password = hash
            
            const user = await User.findByIdAndUpdate(id, { $set: fieldsToUpdate })
            if (!user) throw new Error(`user with id ${id} does not exist`)
            }
        
        /* const user=await User.findByIdAndUpdate(id, { $set: fieldsToUpdate })
             if (!user) throw Error(`User with id ${id} does not exist.`) */

    })()

}




/* const { models: { User } } = require('ktbo-data')
const { validate } = require('ktbo-utils')
const bcrypt = require('bcryptjs') */

/* module.exports = function (id, data) {
    validate.string(id, 'id')
    
    return (async () => {
        
        
        if(data.password){
        const hash = await bcrypt.hash(data.password, 10)
        
        data.password = hash
        
        const user = await User.findByIdAndUpdate(id, { $set: data })
        if (!user) throw new Error(`user with id ${id} does not exist`)
        }
    })()
} */