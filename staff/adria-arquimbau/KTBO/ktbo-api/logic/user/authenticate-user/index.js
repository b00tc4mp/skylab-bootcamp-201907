const { models: { User } } = require('ktbo-data')
const { validate } = require('ktbo-utils')
const bcrypt = require('bcryptjs')

/**
 * Authenticates a user by its credentials.
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {Promise} - Returns a Promise with User Id and User Token
 */

module.exports = function (email, password) {

    validate.string(email, 'e-mail')
    validate.email(email, 'e-mail')
    validate.string(password, 'password')

    return (async () => {

        const user = await User.findOne({ email })
        if (!user) throw new Error(`user with e-mail ${email} does not exist`)

        const match = await bcrypt.compare(password, user.password)
        if (!match) throw new Error('wrong credentials')
        return user.id
    })()
}