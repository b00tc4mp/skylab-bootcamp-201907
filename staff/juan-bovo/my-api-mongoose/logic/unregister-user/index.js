const { User } = require('../../data')

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

    return User.deleteOne({ _id: id, password })
        .then(result => {
            if (!result.deletedCount) throw new Error(`wrong credentials`)
        })
}