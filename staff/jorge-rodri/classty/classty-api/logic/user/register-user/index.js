const { models } = require('classty-data')
const { User } = models
const { validate } = require('classty-utils')
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
module.exports = function (name, surname, email, password, type) {
    validate.string(email, 'e-mail')
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(password)
    validate.string(type)
        return (async () => {
        
        const user = await User.findOne({ email })

        if (user) throw Error(`user with e-mail ${email} already exists`)

        await User.create({ name, surname, email, password, type })
    
    })()
}