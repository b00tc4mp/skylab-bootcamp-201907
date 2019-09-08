const { validate } = require('utils')
const { models: { User } } = require('data')

/**
 * Updates a user.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */

module.exports = function (id, dataToUpdate) {

    validate.string(id, 'user id')
    validate.object(dataToUpdate, 'body')

    return (async() => {
        const user = await User.findByIdAndUpdate(id, { $set: dataToUpdate })
        if (!user) throw new Error(`user with id ${id} does not exist`)
    })()
}