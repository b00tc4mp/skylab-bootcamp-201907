const validate = require('../../../utils/validate')
const { User } = require('../../../models')

/**
 * 
 * @param {*} id
 * @param {*} fieldsToUpdate 
 * 
* @returns {Promise}
*/


module.exports = function (id, data) {
    validate.string(id, 'id')

    return User.findByIdAndUpdate(id, { $set: data })
        .then(user => {
            if (!user) throw new Error(`user with id ${id} does not exist`)
        })
}