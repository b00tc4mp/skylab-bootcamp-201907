const { models: { User } } = require('menu-planner-data')
const { validate } = require('menu-planner-utils')
const bcrypt = require('bcryptjs') 


/**
 * Unregister user by their id
 * 
 * @param {string} userId 
 * @param {string} email
 * @param {string} password 
 * 
 * @returns {Promise}
*/

module.exports = function(userId, password) {
    validate.string(userId, 'userId')
    validate.string(password, 'password')

    return(async ()=>{
        const user = await User.findById({_id: userId})
        if(!user) throw Error ('wrong credentials')
        
        const match = await bcrypt.compare(password, user.password)
        if(!match) throw Error ('wrong credentials')
        
        const result = await User.deleteOne({ _id: userId })
        if (!result.deletedCount) throw Error('wrong credentials')
    })()        
}