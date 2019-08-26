/**
 * Update an user.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */

const { User } = require('../../data')
const validate = require ('../../utils/validate')

module.exports = function (id, data) {
    validate.string (id, 'id')
    validate.object (data, 'data')
    
    return User.updateOne({ _id: id }, { $set: data }) 
    //The $set operator replaces the value of a field with the ($set) specified value.
        .then(result => {
            if (!result.nModified) throw new Error(`user with id ${id} does not exist`)
        })
}