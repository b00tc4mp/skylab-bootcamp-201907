const { ObjectId } = require('mongodb')
const validate = require('../../../utils/validate')
const { User } = require('../../../models')

/**
 * Unregisters a user by their id
 * 
 * @param {string} id 
 * @param {string} email
 * @param {string} password 
 * 
 * @returns {Promise}
*/

module.exports = function(id, email, password) {

    validate.string(id, 'id')
    validate.string(email, 'email')
    validate.string(password, 'password')

    return User.deleteOne({ _id: id, email, password })
        .then(result => {
            if (!result.deletedCount) throw Error(`There was an error unregistering the user`)
        })
}