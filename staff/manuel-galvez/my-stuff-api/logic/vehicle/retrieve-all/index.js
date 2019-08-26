const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../models')

/**
 * 
 * @param {*} vehicleId 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'User id')

    return Vehicle.find({ owner : id }, { __v: 0 }).lean()
        .then(vehicles => {
            if (!vehicles) throw Error(`User with id ${userId} does not own any car.`)
            vehicles.forEach(vehicle => {
                vehicle.id = vehicle._id
                delete vehicle._id
            })
            return vehicles
        })
}