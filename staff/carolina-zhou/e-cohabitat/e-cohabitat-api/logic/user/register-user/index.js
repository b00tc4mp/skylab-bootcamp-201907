const validate = require('../../../utils/validate')
const { User } = require('../../../data')

/**
 * Registers a user.
 * 
 * @param {string} username 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (username, name, surname, email, password) {
    validate.string(username, 'name')
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'e-mail')
    validate.string(password, 'password')

    return (async () => {
        const user = await User.findOne({ email })

        if (user) throw new Error(`user with e-mail ${email} already exists`)

        return User.create({ username, name, surname, email, password })
    })()
}