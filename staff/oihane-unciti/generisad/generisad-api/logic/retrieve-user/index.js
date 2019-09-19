const { models: { User } } = require('generisad-data')
const { validate } = require('generisad-utils')

/**
  * Retrieve user.
 * 
 * 
 * @param {String} userId
 * 
 * @throws {TypeError} - if id is not a string.
 * @throws {Error} - if user already not found .
 * 
 * @returns {Promise}
 * @returns {} empty object
*/


module.exports = function(id) {
    
    validate.string(id, 'user id')

    return (async () => {
        const user = await User.findOne({ _id: id }, { _id: 0, password: 0 }).lean()
            if (!user) throw Error(`user with id ${id} not found`)
            else {
                user.id = id
                return user
            }
    })()
}