const { models: { User } } = require('vltra-data')
const { validate} = require('vltra-utils')
const bcrypt = require('bcryptjs')

/**
 * Authenticates a user by its credentials.
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {Promise}
 */

module.exports = function (email, password) {
    validate.email(email, 'email')
    validate.string(password, 'password')

    return (async () => {

        const user = await User.findOne({ email })

        if(!user) throw new Error (`user with email ${email} does not exist`)

        // if (user.password !== password) throw new Error('wrong credentials')
        const match = await bcrypt.compare(password , user.password)

        if(!match) throw new Error ('wrong credentials')
        
        return user.id
    })()
}