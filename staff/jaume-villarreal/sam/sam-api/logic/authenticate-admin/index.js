const { validate } = require('utils')
const bcrypt = require('bcryptjs')
const { models : { Admin } } = require('data')

/**
 * Authenticates an admin by its credentials.
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {Promise}
 */

module.exports =  function(email , password){
    validate.string(email , 'email')
    validate.email(email , 'email')
    validate.string(password , 'password')
    
    return( async()=> {
        const admin = await Admin.findOne({ email })

        if(!admin) throw new Error (`admin with email ${email} does not exist`)

        const match = await bcrypt.compare(password , admin.password)

        if(!match) throw new Error ('wrong credentials')
        
        return admin.id
    })()
}