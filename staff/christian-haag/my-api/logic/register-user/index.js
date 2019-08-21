/**
 * Register users
 * 
 * @param {string} name
 * @param {string} surname
 * @param {string} email
 * @param {number} password
 * 
 * @return {Promise} 
 * 
 */


const validate = require('../../utils/validate')

module.exports = {
    registerUser(name, surname, email, password) {
        validate.string(name, 'name')
        validate.string(surname, 'surname')
        validate.string(email, 'email')
        validate.string(password, 'password')

        return this.__users__.findOne({ email })
            .then(user => {
                if (user) throw Error('user already exists')
                return this.__users__.insertOne({ name, surname, email, password })
            })
            .catch(error => { throw error })
    }
}