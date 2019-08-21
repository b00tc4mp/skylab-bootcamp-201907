const { ObjectId } = require('mongodb')

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
            .then(user => {
                if (!user || user.password !== password) throw new Error(`wrong credentials`)
                return user._id.toString()
            })
    }
}

