const validate = require('../../../utils/validate')
const { Vehicle, User } = require('../../../data')
      /**
       * Retrieves a vehicle by its id.
       * 
       * @param {string} id The id its given by register a vehicle
       * 
       * @returns {Promise}
       * 
       * 
       */
module.exports = function(id){
    validate.string(id, 'id')

    return Vehicle.findOne({_id: id}, {_id:0, __v:0}).lean()
    .then(vehicle=>{
        if(!vehicle)throw Error(`Vehicle with id ${id} does not exist.`)
        vehicle.id = id
        return vehicle
        })



}