const { User, Vehicle, Property } = require('../../../data')
/**
 * Unregisters a user.
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (id, password) {
    // TODO validate fields
    if(id.length == 0) throw Error('id is empty')
    return (async () => {

        const result = await User.deleteOne({ _id: id, password })

        if (!result.deletedCount) throw Error(`wrong credentials`)

    })()
}