const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../models')

/**
 * 
 * @param {*} vehicleId 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'User ID')

    return (async ()=>{

        const vehicles = await Vehicle.find({ owner : id }, { __v: 0 }).lean()
            if (!vehicles.length) throw Error(`User with id ${id} does not own any vehicle.`)
            vehicles.forEach(vehicle => {
                    vehicle.id = vehicle._id
                    delete vehicle._id
                })
                return vehicles
           
    })()

}