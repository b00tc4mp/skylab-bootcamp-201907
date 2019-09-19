const { models: { User } } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 * Retrieves a user by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
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