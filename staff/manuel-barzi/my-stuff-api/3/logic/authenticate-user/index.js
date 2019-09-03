const { models: { User } } = require('my-stuff-data')
const { validate } = require('my-stuff-utils')

/**
 * Authenticates a user by its credentials.
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {Promise}
 */
module.exports = function (email, password) {
    validate.string(email, 'e-mail')
    validate.email(email, 'e-mail')
    validate.string(password)

    return (async () => {
        const user = await User.findOne({ email })

        if (!user) throw new Error(`user with e-mail ${email} does not exist`)

        if (user.password !== password) throw new Error('wrong credentials')

        return user.id
    })()
}