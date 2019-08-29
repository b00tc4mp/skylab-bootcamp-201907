const validate = require('../../../utils/validate')
const { User, Vehicle } = require('../../../models')

/**
 * 
 * @param {*} make 
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

module.exports = function(id, make, model, year, type, color, electric, plate) {

    validate.string(make, 'make')
    validate.string(model, 'model')
    validate.number(year, 'year')
    validate.string(type, 'type')
    validate.string(color, 'color')
    validate.boolean(electric, 'electric')
    validate.string(plate, 'plate')
    validate.string(id, 'id')


    return (async() => {
        
        const response  =  await Vehicle.findOne({ plate })
            if (response) throw new Error('Vehicle already exists.')
            const vehicle = new Vehicle({
                make, 
                model,
                year,
                type,
                color,
                electric,
                plate 
             })
             debugger
                vehicle.owner = id
                await vehicle.save()
                    const responseVehicle= await Vehicle.findOne({ plate })
                    if (!responseVehicle) throw new Error(`Vehicle with plate ${plate} does not exist`)
                    return responseVehicle._id.toString()
        
    })()
}
