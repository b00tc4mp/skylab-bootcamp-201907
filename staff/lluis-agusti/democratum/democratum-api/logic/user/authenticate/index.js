const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const bcrypt = require('bcryptjs')
const { User } = models

/**
* 
* @param {string} email
* @param {string} password
* 
* @returns {Promise}
*/

module.exports = function(email, password) {
   
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return (async () => {

        const user = await User.findOne({ email })
        
        if(!user) throw new Error(`user with e-mail ${email} does not exist`)
            
        //if (user.password !== password) throw Error('wrong credentials')

        const { id } = user

        const match = await bcrypt.compare(password, user.password)

        if (!match) throw Error('wrong credentials')

        return id
    })()
}