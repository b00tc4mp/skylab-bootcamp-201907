const validate = require('../../../utils/validate')
/* Add: */ const { User } = require('../../../data')

/**
 * Registers a user.
 * 
 * @param {string} name 
 * @param {string} surname
 * @param {string} instrmuent 
 * @param {string} description 
 * @param {string} email 
 * @param {string} password
 * 
 * @returns {Promise}
 */


module.exports = function (name, surname,instrument,description,email, password) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(instrument, 'instrument')
    validate.string(description, 'description')
    validate.string(email, 'email')
    validate.string(password, 'password')

    
    return User.findOne({ email })
        .then(user => {
            if (user) throw new Error(`user with e-mail ${email} already exists`)

          

            return User.create({ name, surname,instrument,description, email, password })
        })
        .then(() => { })
}