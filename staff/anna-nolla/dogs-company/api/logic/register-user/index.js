const { models: { User } } = require('data')
const { validate } = require('utils')
/**
 * Registers a user.
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @param {string} password
 * 
 */

module.exports = function(name, surname, email, password) {

    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return (async () => {
        const user = await User.findOne({ email })
            if (user) throw new Error(`user with e-mail ${email} already exists`)
            else await User.create({name, surname, email, password})
    })()    
}