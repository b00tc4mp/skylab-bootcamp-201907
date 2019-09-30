const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../data')

/**
 * Update changes in the vehicle by user id
 * @param {*} id
 * @param {*} fieldsToUpdate 
 * 
* @returns {Promise}
*/

module.exports = function(id, fieldsToUpdate) {
    validate.string(id, 'id')

    return Vehicle.findByIdAndUpdate(id, { $set: fieldsToUpdate })
        .then(vehicle => {
             if (!vehicle) throw Error(`Vehicle with id ${id} does not exist.`)
        })
}