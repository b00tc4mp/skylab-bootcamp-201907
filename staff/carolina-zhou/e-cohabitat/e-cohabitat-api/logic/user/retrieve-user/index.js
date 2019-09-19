const { validate } = require('utils')
const { models: { User } } = require('data')

/**
 * Retrieves a user by the user id.
 * 
 * @param {string} id user id
 * 
 * @throws {TypeError} - if id is not a string.
 * @throws {Error} - if id is empty, undefined or if user is not found.
 * 
 * @returns {Object} user object.
 */

module.exports = function (id) {
    
    validate.string(id, 'user id')

    return ( async() => {
        const user = await User.findOne({ _id: id }, { _id: 0, password: 0 }).lean()
        if (!user) throw new Error(`user with id ${id} not found`)

        return user
    })()
}