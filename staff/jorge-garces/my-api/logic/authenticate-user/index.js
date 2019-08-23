const validate = require('../../utils/validate')

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * 
 * @returns {Promise}
 */

module.exports = function (email, password) {

    validate.string(email, 'username')
    validate.email(email, 'username')
    validate.string(password, 'password')

    // Register
    return this.__users__.findOne({ email, password })
        .then(user => {
            if (!user) throw Error('Wrong credentials.')
            return user._id.toString()

        })
}