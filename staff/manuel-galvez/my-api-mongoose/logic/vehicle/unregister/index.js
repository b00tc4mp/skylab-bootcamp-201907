const { ObjectId } = require('mongodb')
const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../models')

/**
 * Unregisters a user by their id
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {

    validate.string(id, 'Vehicle id')

    debugger
    return Vehicle.deleteOne({ _id: id })
        .then(vehicle => {
            if (!vehicle.deletedCount) throw Error(`Wrong user or credentials.`)
        })
}