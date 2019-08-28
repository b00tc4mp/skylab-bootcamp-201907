const { User } = require('../../../data')

/**
 * Updates a user.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */
module.exports = function (id, data) {
    debugger
    return User.findByIdAndUpdate(id, { $set: data })
        .then(user => {
            debugger
            if (!user) throw new Error(`user with id ${id} does not exist`)
        })
}