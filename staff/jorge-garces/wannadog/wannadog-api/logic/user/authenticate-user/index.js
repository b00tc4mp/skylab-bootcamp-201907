const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const bcrypt = require('bcryptjs')
const { User } = models

/**
* Authenticates a user 
* 
* @param {*} email 
* @param {*} password 
* 
* @returns {Promise}
*/

module.exports = function (email, password) {

    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return (async () => {
        const user = await User.findOne({ email })
        if (!user) throw Error('Wrong credentials.')

        const match = await bcrypt.compare(password, user.password)

        if (!match) throw new Error('Wrong credentials')

        return user.id
    })()
}