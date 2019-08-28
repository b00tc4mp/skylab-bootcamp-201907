const { User } = require('../../data')
const validate = require('../../utils/validate')

/**
 * Authenticates a user by its credentials.
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {Promise}
 */
module.exports = function (email, password) {
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return User.findOne({ email })
        .then(user => {
            if (!user) throw new Error('wrong credentials')

            if (user.password !== password) throw new Error('wrong credentials')

            return user.id
        })
}