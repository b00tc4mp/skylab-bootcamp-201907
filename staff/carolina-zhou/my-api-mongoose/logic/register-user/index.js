const validate = require('../../utils/validate')
/* Add: */ const { User } = require('../../data')

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

    // this.__users__.findOne() --> User.findOne()
    return User.findOne({ email })
        .then(user => {
            if (user) throw new Error(`user with e-mail ${email} already exists`)

            // this.__users__.insertOne() --> User.create()
            return User.create({ name, surname, email, password })
        })
        .then(() => { })
}