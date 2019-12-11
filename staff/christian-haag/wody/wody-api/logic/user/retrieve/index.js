const { validate } = require('wody-utils')
const { models: { User } } = require('wody-data')
/**
 * Retrieves a user by its id.
 * 
 * @param {string} id 
 * @returns {Promise}
 */
module.exports = function (id) {

    validate.string(id, 'id')

    return (async () => {

        const user = await User.findOne({ _id: id }, { _id: 0, password: 0 }).lean()

        if (!user) throw new Error(`user with id ${id} not found`)

        user.id = user._id
        user.id = id
        delete user._id

        return user

    })()

}