const { validate } = require('utils')
const { models: { User } } = require('data')
const bcrypt = require('bcryptjs')

/**
 * Authenticates a user by its credentials.
 * 
 * @param {string} email user's email
 * @param {string} password user's password
 * 
 * @throws {TypeError} - if any parameter is not a string.
 * @throws {Error} - if any parameter is empty/undefined, if email is not found or password does not match.
 * 
 * @returns {String} user id string.
 */

module.exports = function (email, password) {

    validate.string(email, 'e-mail')
    validate.email(email, 'e-mail@gmail.com')
    validate.string(password, 'password')

    return (async () => {
        const user = await User.findOne({ email })
        if (!user) throw new Error(`wrong credentials`)
    
        const match = await bcrypt.compare(password, user.password)
        if (!match) throw Error('wrong credentials')

        user.id = user._id.toString()
        delete user._id
    
        return user.id
    })()
}