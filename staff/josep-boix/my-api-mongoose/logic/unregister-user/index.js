/**
 * Unregister an user
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @returns {Promise}
 */
const { User } = require ('../../data')
const validate = require ('../../utils/validate')

module.exports = function (id, password) {
    validate.string (id, 'id')
    validate.string (password, 'password')

    return User.deleteOne ({ _id: id, password })
        .then (result => {
            if (!result.deletedCount) throw new Error ('wrong credentials')
            
        })
}