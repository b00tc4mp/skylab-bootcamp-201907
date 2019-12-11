const { validate } = require('utils')
const bcrypt = require('bcryptjs')
const { models : { Tutor } } = require('data')

/**
 * Authenticates a tutor by its credentials.
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
        const tutor = await Tutor.findOne({ email })

        if(!tutor) throw new Error (`tutor with email ${email} does not exist`)

        const match = await bcrypt.compare(password , tutor.password)
        
        if(!match) throw new Error ('wrong credentials')
        
        return tutor.id
    })()
}