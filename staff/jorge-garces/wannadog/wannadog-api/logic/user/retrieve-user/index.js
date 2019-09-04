const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const { User } = models

/**
 * Retrieves a registered user
 * 
 * @param {string} name
 * @param {string} surname
 * @param {string} email
 * @param {string} password
 * 
 * @returns {Promise}
*/

module.exports = function (id) {

    validate.string(id, 'id')

    return (async () => {
        const user = await User.findOne({ _id: id }, { _id: 0, password: 0 }).lean()
        if (!user) throw Error(`User with id ${id} does not exist.`)
        user.id = id
        return user
    })()
}