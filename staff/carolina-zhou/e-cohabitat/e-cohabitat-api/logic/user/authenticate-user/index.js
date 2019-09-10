const { validate } = require('utils')
const { models: { User } } = require('data')
const bcrypt = require('bcryptjs')

/**
 * Authenticates a user by its credentials.
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {Promise}
 */

module.exports = function (email, password) {

    validate.string(email, 'e-mail')
    validate.email(email, 'e-mail@gmail.com')
    validate.string(password, 'password')

    return (async () => {
        const user = await User.findOne({ email })
        if (!user) throw new Error(`wrong credentials`)
    
        const match = await bcrypt.compare(password, user.password)
        if (!match) throw Error('wrong credentials')
    
        return user.id
    })()
}