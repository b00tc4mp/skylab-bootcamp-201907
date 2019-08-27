const validate = require('../../utils/validate')
const { ObjectId } = require('mongodb')

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

    return this.__users__.deleteOne({ _id: ObjectId(id), password })
        .then(result => {
            if (!result.deletedCount) throw new Error(`wrong credentials`)
        })
}