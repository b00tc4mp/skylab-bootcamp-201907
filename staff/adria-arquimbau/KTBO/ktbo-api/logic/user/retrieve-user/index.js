const { models: { User } } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 * Retrieves a user by its id.
 * 
 * @param {string} id - Identifier of the user.
 * 
 * @returns {Promise} - Returns a promise with the all of the user params without password.
 */

module.exports = function (id) {

    validate.string(id, 'id')

    return(async () => { 

        const user = await User.findOne({ _id: id }, { __v:0, _id: 0, password: 0 }).lean()
        if (!user) throw new Error(`user with id ${id} not found`)
        user.id = id

        return user

    })()
}