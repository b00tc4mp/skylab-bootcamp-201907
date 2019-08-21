/**
 * Authenticate user
 * 
 * @param {string} email
 * @param {number} password
 * 
 * @return {Promise}
 * 
 */


const validate = require('../../utils/validate')

module.exports = {
    authenticateUser(email, password) {
        validate.string(email, 'email')
        validate.string(password, 'password')


        return this.__users__.findOne({ email, password })
            .then(response => {
                if (!response) throw Error('wrong credentials')
                return response._id.toString()
            })
            .then(() => { })

    }
}

