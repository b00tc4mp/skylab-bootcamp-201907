/**
 * Authenticates a user by its credentials.
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {Promise}
 */

const validate = require('../../utils/validate')
module.exports = {
    /**
     * 
     * @param {*} email 
     * @param {*} password 
     * 
     * @returns {Promise}
     */

    authenticateUser(email, password) {
        let data = {}
        validate.string(email, 'username')
        validate.email(email, 'username')
        validate.string(password, 'password')

        // Register
        return this.__users__.findOne({ email, password })
            .then(response => {
                if (!response) throw Error('Wrong credentials.')
                data.id = response._id.toString()
                data.token = `token-${Math.random()}`
                return data
            })
    }
}