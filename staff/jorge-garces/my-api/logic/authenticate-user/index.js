const validate = require('../../utils/validate')

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * 
 * @returns {Promise}
 */

module.exports = function (email, password) {
    let data = {}
    validate.string(email, 'username')
    validate.email(email, 'username')
    validate.string(password, 'password')

    // Register
    return this.__users__.findOne({ email, password })
        .then(response => {
            if (!response) throw Error('Wrong credentials.')
            data = response._id.toString()
            return data
        })
}