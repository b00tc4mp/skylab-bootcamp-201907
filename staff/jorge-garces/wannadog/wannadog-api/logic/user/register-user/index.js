const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const bcrypt = require('bcryptjs')
const { User } = models

/**
 * Registers a user
 * 
 * @param {string} name
 * @param {string} surname
 * @param {string} email
 * @param {string} password
 * @param {number} longitude
 * @param {number} latitude
 * 
 * @returns {Promise}
 */

module.exports = function (registerInfo) {

    const { name, surname, email, password } = registerInfo

    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return (async () => {
        const user = await User.findOne({ email: registerInfo.email })
        if (user) throw Error('User already exists.')
        registerInfo.password = await bcrypt.hash(password, 10)
        await User.create(registerInfo)
    })()
}