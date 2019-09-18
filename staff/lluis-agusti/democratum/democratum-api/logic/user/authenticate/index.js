const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const bcrypt = require('bcryptjs')
const { User } = models

/**
* Logs in an existing user.
* 
* @param {string} email email of the user.
* @param {string} password password of the user
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

        //const { id } = user

        const match = await bcrypt.compare(password, user.password)

        if (!match) throw Error('wrong credentials')

        return user.id
    })()
}