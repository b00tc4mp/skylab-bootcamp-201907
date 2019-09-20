const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../models')

/**
 * 
 * @param {*} id 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'id')

    return (async () => {
        
        const vehicle = await Vehicle.findOne({ _id: id }, { _id: 0, __v: 0 }).lean()
        if (!vehicle) throw Error(`vehicle with id ${id} does not exist`)
        vehicle.id = id                
        return vehicle
    })()
    
}