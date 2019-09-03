/**
 * Authenticate an user by credentials
 * 
 * @param {string} email
 * @param {string} password
 * 
 * @returns {Promise}
 */
const validate = require ('../../utils/validate')

module.exports = function (email, password) {
    validate.string (email, 'email')
    validate.email (email, 'email')
    validate.string (password, 'password')

    return this.__users__.findOne ({email})
        .then (user =>{
            if (!user || user.password !== password) throw Error ('Wrong credentials')

            return user._id.toString()
        })
}