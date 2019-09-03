const { models: { User } } = require('my-stuff-data')

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

    return User.findOne({ email })
        .then(user => {
            if (user) throw new Error(`user with e-mail ${email} already exists`)

            return User.create({ name, surname, email, password })
        })
        .then(() => { })
}