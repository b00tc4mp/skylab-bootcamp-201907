const { User } = require('../../data')
const validate = require('../../utils/validate')

/**
 * Registers a user.
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (name, surname, email, password) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.string(password, 'password')
    
    return User.findOne({ email })
        .then(user => { debugger
            if (user) throw new Error(`user with e-mail ${email} already exists`)

            return User.create({ name, surname, email, password })
        })
        .then(() => {})
}