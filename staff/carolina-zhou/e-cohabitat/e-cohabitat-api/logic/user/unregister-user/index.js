const { validate } = require('../../../../e-cohabitat-utils')
const { models: { User } } = require('../../../../e-cohabitat-data')

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
        const user = await User.deleteOne({ _id: id, password })
        if (!user.deletedCount) throw new Error(`wrong credentials`)
    })()
}