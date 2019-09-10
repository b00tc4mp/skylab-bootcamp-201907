/**
 * Authenticate an user by credentials
 * 
 * @param {string} email
 * @param {string} password
 * 
 * @returns {Promise}
 */
const validate = require ('../../utils/validate')
const { User } = require ('../../data')

module.exports = function (email, password) {
    validate.string (email, 'email')
    validate.email (email, 'email')
    validate.string (password, 'password')
    
    debugger
    return User.findOne({email})
        .then (user =>{
            if (!user || user.password !== password) throw Error ('Wrong credentials')

            return user.id.toString()
        })
}