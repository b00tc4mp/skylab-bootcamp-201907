/**
 * Update an user.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */

const { ObjectId } = require('mongodb')
const validate = require ('../../utils/validate')

module.exports = function (id, data) {
    validate.string (id, 'id')
    validate.object (data, 'data')
    
    return this.__users__.updateOne({ _id: ObjectId(id) }, { $set: data }) 
    //The $set operator replaces the value of a field with the specified value.
        .then(result => {
            if (!result.result.nModified) throw new Error(`user with id ${id} does not exist`)
        })
}