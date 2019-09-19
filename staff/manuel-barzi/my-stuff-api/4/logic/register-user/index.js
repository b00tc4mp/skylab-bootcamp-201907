const { models: { User } } = require('my-stuff-data')
const bcrypt = require('bcryptjs')

/**
 * Registers a user.
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (name, surname, email, password) {
    // TODO validate fields

    return (async () => {
        const user = await User.findOne({ email })

        if (user) throw new Error(`user with e-mail ${email} already exists`)

        const hash = await bcrypt.hash(password, 10)

        await User.create({ name, surname, email, password: hash })
    })()
}