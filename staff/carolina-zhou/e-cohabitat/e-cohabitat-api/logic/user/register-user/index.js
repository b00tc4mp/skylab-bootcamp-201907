const { validate } = require('utils')
const { models: { User } } = require('data')
const bcrypt = require('bcryptjs')

/**
 * Registers a user.
 * 
 * @param {string} username user's username
 * @param {string} name user's real name
 * @param {string} surname user's real surname
 * @param {string} email user's email
 * @param {string} password user's password
 * 
 * @throws {TypeError} - if any parameter is not a string
 * @throws {Error} - if any parameter is empty/undefined. if there is already a user registered under the same email or username.

 * @returns {Promise}
 */

module.exports = function (username, name, surname, email, password) {
   
    validate.string(username, 'username')
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'e-mail')
    validate.email(email, 'e-mail@gmail.com')
    validate.string(password, 'password')

    return (async () => {
        const userEmail = await User.findOne({ email })
        const userUsername = await User.findOne({ username })

        if (userEmail) throw new Error(`user with e-mail ${email} already exists`)
        if (userUsername) throw new Error(`user with username ${username} already exists`)

        const hash = await bcrypt.hash(password, 10)

        await User.create({ username, name, surname, email, password: hash })
    })()
}