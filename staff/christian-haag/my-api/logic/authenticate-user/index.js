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

module.exports = function (email, password) {
    validate.string(email, 'email')
    validate.string(password, 'password')

    return this.__users__.findOne({ email })
        .then(user => {
            if (!user) throw new Error(`User does not exist`)
            if (user.password !== password) throw new Error(`wrong credentials`)

            return user._id.toString()
        })
}


