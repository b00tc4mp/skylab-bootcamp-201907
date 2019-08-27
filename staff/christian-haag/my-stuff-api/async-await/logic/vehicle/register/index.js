const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../data')


module.exports = function (id, brand, model, year, type, color, electric, plate) {

    validate.string(id, 'id')
    validate.string(brand, 'brand')
    validate.string(model, 'model')
    validate.number(year, 'year')
    validate.string(type, 'type')
    validate.string(color, 'color')
    validate.boolean(electric, 'electric')
    validate.string(plate, 'plate')

    return Vehicle.findOne({ plate })
        .then(res => {
            if (res) throw new Error('vehicle already exist')

            const vehicle = new Vehicle({ model, year, type, color, electric, plate })
            vehicle.owner = id
            return vehicle.save()
        })
        .then(() => Vehicle.findOne({ plate }))
        .then(res => {
            if (!response) throw new Error(`vehicle with plate ${plate} does not exist`)
            return response._id.toString()
        })

}