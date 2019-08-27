const { ObjectId } = require('mongodb')
const validate = require('../../utils/validate')
/**
     * 
     * @param {*} id
     * @param {*} fieldsToUpdate 
     * 
    * @returns {Promise}
*/
module.exports = function(id, fieldsToUpdate) {

    validate.string(id, 'id')

    return this.__users__.updateOne({ _id: ObjectId(id) }, { $set: fieldsToUpdate })
        .then(user => {
             if (!user.result.nModified) throw Error(`User with id ${id} does not exist.`)
        })
}