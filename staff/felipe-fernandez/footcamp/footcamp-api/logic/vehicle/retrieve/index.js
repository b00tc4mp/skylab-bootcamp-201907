const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../models')

/**
 * 
 * @param {*} id 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'Vehicle ID')

    return (async() => {

        const vehicle = await  Vehicle.findOne({ _id: id }, { _id: 0, __v: 0 }).lean()
            if (!vehicle) throw Error(`Vehicle with id ${id} does not exist.`)
            vehicle.id = id 
            return vehicle
          
    })()
}