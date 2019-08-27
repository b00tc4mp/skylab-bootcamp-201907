const validate = require('../../utils/validate')
const { ObjectId } = require('mongodb')

/**
 * Unregisters an existent user account.
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (id, password) {
    validate.string(id, 'id')
    validate.string(password, 'password')

    return this.__users__.deleteOne({ _id: ObjectId(id), password })
        .then(result => {
            if (!result.deletedCount) throw new Error(`wrong credentials`)
        })
}

// Alternative function
/* unregisterUser(id) {
    validate.string(id, 'id')

    return this.__users__.findOne({ _id: ObjectId(id) }, { projection: { _id: 0, password: 0 } })
        .then(user => {
            if (!user) throw new Error(`user does not exist`)

            return this.__users__.deleteOne({ _id: ObjectId(id) })
        })
} */