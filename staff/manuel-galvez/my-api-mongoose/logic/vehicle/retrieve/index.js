const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../models')

/**
 * 
 * @param {*} vehicleId 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'Vehicle ID')

    return Vehicle.findOne({ _id: id }, { _id: 0 }).lean()
        .then(vehicle => {
            if (!vehicle) throw Error(`Vehicle with id ${id} does not exist.`)
            vehicle.id = id 
            return vehicle
        })
}