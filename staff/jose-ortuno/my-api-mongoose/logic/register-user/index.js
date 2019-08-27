const validate = require('../../utils/validate')
const { User } = require('../../data')

module.exports = 
/**
 * Register user
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @param {string} password 
 * @param {string} repassword 
 */
function (name, surname, email, password, repassword) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.email(email, 'email')
    validate.string(password, 'password')
    validate.string(repassword, 'repassword')

    if (password !== repassword) throw new Error('passwords do not match')

    return User.findOne({ email })
        .then(user => {
            if (user) throw Error('Email already registered')
            return User.create({ name, surname, email, password })
        }).then(() => { })
}