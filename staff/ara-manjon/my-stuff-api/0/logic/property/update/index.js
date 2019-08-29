const validate = require('../../../utils/validate')
const { Property } = require('../../../data')

/**
 * Update property fields by user id.
 * @param {*} id
 * @param {*} fieldsToUpdate 
 * 
* @returns {Promise}
*/

module.exports = function(id, fieldsToUpdate) {
    validate.string(id, 'id')

    return Property.findByIdAndUpdate(id, { $set: fieldsToUpdate })
        .then(property => {
             if (!property) throw Error(`property with id ${id} does not exist`)
        })
}