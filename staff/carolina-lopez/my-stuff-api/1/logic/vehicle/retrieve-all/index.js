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

    return (async () => {

       const vehicles = await Vehicle.find({ owner : id }, { __v: 0 }).lean()
        if (!vehicles) throw Error(`User with id ${userId} does not own any car.`)
        vehicles.forEach(vehicle => {
            vehicle.id = vehicle._id
            delete vehicle._id
            })
            return await vehicles

    })()
}