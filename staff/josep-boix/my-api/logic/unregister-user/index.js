/**
 * Unregister an user
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @returns {Promise}
 */
const { ObjectId } = require ('mongodb')
const validate = require ('../../utils/validate')

module.exports = function (id, password) {
    validate.string (id, 'id')
    validate.string (password, 'password')

    return this.__users__.deleteOne ({ _id: ObjectId(id), password })
        .then (result => {
            if (!result) throw new Error ('Wrong credentials')
            
        })
}