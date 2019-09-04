const { models: { User } } = require('data')
const { validate } = require('utils')
/**
 * Unregisters a user.
 * 
 * @param {string} id
 * @param {string} password
 * 
 */

module.exports = function (id, password) {
    validate.string(password, 'password')
    validate.string(id, 'user id')

    return (async () => {
        const result = await User.deleteOne({ _id: id, password })
            if (!result.deletedCount) throw new Error(`Wrong credentials`)
    })()
}