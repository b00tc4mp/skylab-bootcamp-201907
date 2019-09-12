const validate = require('../../../utils/validate')
// const { ObjectId } = require('mongodb')
/* Add: */ const { User } = require('../../../data')

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

    return User.deleteOne({ _id: id, password })
        .then(result => {
            if (!result.deletedCount) throw new Error(`wrong credentials`)
        })
}