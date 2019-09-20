const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../models')
/**
 * 
 * @param {*} id
 * @param {*} fieldsToUpdate 
 * 
* @returns {Promise}
*/
module.exports = function (id, fieldsToUpdate) {
    const { make, model, year, type, color, electric, plate } = fieldsToUpdate
    validate.string(id, 'id')
    if (model) validate.string(make, 'make')
    if (make) validate.string(model, 'model')
    if (year) validate.number(year, 'year')
    if (type) validate.string(type, 'type')
    if (color) validate.string(color, 'color')
    if (electric) validate.boolean(electric, 'electric')
    if (plate) validate.string(plate, 'plate')
    return (async () => {
        await Vehicle.findByIdAndUpdate(id, fieldsToUpdate)
    })();
}