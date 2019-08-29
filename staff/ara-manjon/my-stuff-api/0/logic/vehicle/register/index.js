const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../data')

/**
 * Register a vehicle by user id.
 * @param {*} brand 
 * @param {*} model 
 * @param {*} year 
 * @param {*} type 
 * @param {*} color 
 * @param {*} electric 
 * @param {*} plate 
 * @param {*} id 
 * 
 * @returns {Promise}
 */

module.exports = function(id, brand, model, year, type, color, electric, plate) {
    
    validate.string(brand, 'brand')
    validate.string(model, 'model')
    validate.number(year, 'year')
    validate.string(type, 'type')
    validate.string(type, 'type')
    validate.string(color, 'color')
    validate.boolean(electric, 'electric')
    validate.string(plate, 'plate')
    validate.string(id, 'id')

    
    return Vehicle.findOne({ plate })
        .then(response => {
            
            if (response) throw Error('Vehicle already exists.')
            const vehicle = new Vehicle({
                brand, 
                model,
                year,
                type,
                color,
                electric,
                plate 
            })
            vehicle.owner=id
            return vehicle.save()
        })
        .then(()=>Vehicle.findOne({plate}))
        .then(response => {
            if(!response) throw new Error(`Vehicle with plate ${plate} does not exist`)
            return response._id.toString()
         })
}