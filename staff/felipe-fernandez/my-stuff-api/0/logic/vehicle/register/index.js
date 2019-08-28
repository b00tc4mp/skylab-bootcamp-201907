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

    return Vehicle.findOne({ plate })
        .then(response => {
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
            vehicle.owner = id
            return vehicle.save()
        })
        .then(() => Vehicle.findOne({ plate })
        ).then(response => {
            if (!response) throw new Error(`Vehicle with plate ${plate} does not exist`)
            return response._id.toString()
        })
}
