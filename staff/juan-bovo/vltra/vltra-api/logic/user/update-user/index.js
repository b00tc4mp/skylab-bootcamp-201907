const { models: { User } } = require('vltra-data')
const { validate} = require('vltra-utils')

/**
 * Updates a user.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */

module.exports = function (id, data) {
    validate.string(id, 'id')
    validate.object(data, 'body')

    return (async () => {
        const result = await User.findByIdAndUpdate(id, { $set: data })
        if (!result) throw new Error(`user with id ${id} does not exist`)
    })()
}