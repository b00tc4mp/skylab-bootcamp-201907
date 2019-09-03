const { models: { User } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * Unregisters a user.
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (id, password) {
    validate.string(id, 'id')
    validate.string(password)
    
        return (async () => {

        const result = await User.deleteOne({ _id: id, password })

        if (!result.deletedCount) throw Error(`wrong credentials`)

    })()
}