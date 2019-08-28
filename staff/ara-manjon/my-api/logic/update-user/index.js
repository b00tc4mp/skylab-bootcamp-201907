const { ObjectId } = require('mongodb')

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

    return this.__users__.updateOne({ _id: ObjectId(id) }, { $set: data })
        .then(result => {
            if (!result.result.nModified) throw new Error(`user with id ${id} does not exist`)
        })
}