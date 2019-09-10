const { models: { User } } = require('menu-planner-data')
const { validate } = require('menu-planner-utils')
const bcrypt = require('bcryptjs') 


/**
 * Unregister user by their id
 * 
 * @param {string} id 
 * @param {string} email
 * @param {string} password 
 * 
 * @returns {Promise}
*/

module.exports = function(id, password) {
    validate.string(id, 'id')
    validate.string(password, 'password')

    return(async ()=>{
        const user = await User.findById({_id: id})
        if(!user) throw Error ('wrong credentialsA')
        
        const match = await bcrypt.compare(password, user.password)
        if(!match) throw Error ('wrong credentialsB')
        
        const result = await User.deleteOne({ _id:id })
        if (!result.deletedCount) throw Error('wrong credentialsC')
    })()        
}