const { validate } = require('utils')
const { models: { User } } = require('data')
const bcrypt = require('bcryptjs')

/**
 * Unregisters an existing user account.
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @returns {Promise}
 */

module.exports = function (id, password) {
    
    validate.string(id, 'user id')
    validate.string(password, 'password')

    return (async () => {
        const hash = await bcrypt.hash(password, 10)

        const user = await User.deleteOne({ _id: id, password: hash })
        if (!user.deletedCount) throw new Error(`wrong credentials`)
    })()
}