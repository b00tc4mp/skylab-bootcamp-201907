const { models: { User } } = require('vltra-data')
const { validate} = require('vltra-utils')
const bcrypt = require('bcryptjs')


/**
 * Unregisters a user by their id
 * 
 * @param {string} id user's id on db. It comes from a token.
 * @param {string} email user's email
 * @param {string} password user password to compare with hash (user.password)
 * 
 * @returns {Promise}
*/

module.exports = function(id, email, password) {

    validate.objectId(id, 'id')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')
    
    return(async ()=>{
        const user = await User.findOne({ email })
        if(!user) throw new Error (`user with email ${email} does not exist`)

        const match = await bcrypt.compare(password , user.password)
        if(!match) throw new Error ('wrong credentials')

        const result = await User.deleteOne({ _id: id, email })
        //if (!result.deletedCount) throw Error('wrong credentials')
    })()        
}