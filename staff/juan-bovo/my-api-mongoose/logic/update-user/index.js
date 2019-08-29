// const { ObjectId } = require('mongodb')
const { User } = require('../../data')

/**
 * Updates a user.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */
module.exports = function (id, data) {
    // TODO validate fields

    return User.findByIdAndUpdate({ _id: id }, { $set: data })
        .then(user => {
            // if (!result.result.nModified) throw new Error(`user with id ${id} does not exist`)
            if (!user) throw new Error(`user with id ${id} does not exist`)
        })
}