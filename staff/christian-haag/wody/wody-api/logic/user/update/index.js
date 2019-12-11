const { validate } = require('wody-utils')
const { models: { User } } = require('wody-data')

/**
 * Updates a users data.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */
module.exports = function (id, data) {

    validate.string(id, 'id')

    return (async () => {
        const user = await User.findByIdAndUpdate(id, { $set: data }, { useFindAndModify: false })
        if (!user) throw new Error(`user with id ${id} does not exist`)
    })()
}