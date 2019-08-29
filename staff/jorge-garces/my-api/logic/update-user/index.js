const { ObjectId } = require('mongodb')
const validate = require('../../utils/validate')

/**
 * 
 * @param {*} id
 * @param {*} fieldsToUpdate 
 * 
 * @returns {Promise}
 */

module.exports = function (id, fieldsToUpdate) {

    validate.string(id, 'id')

    return this.__users__.updateOne({ _id: ObjectId(id) }, { $set: fieldsToUpdate })
        .then(user => {
            if (!user) throw Error('Fail to update fields')
            else if (user.result.ok === 0) throw Error('Wrong fields provided.')
        })
}