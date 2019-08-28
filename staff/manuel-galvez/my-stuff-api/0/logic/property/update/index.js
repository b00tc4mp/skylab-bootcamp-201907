const validate = require('../../../utils/validate')
const { Property } = require('../../../models')
/**
 * 
 * @param {*} id
 * @param {*} fieldsToUpdate 
 * 
* @returns {Promise}
*/
module.exports = function (id, fieldsToUpdate) {
    const { address, m2, year, cadastre } = fieldsToUpdate
    validate.string(id, 'id')
    if (address) validate.string(address, 'address')
    if (m2) validate.number(m2, 'm2')
    if (year) validate.number(year, 'year')
    if (cadastre) validate.string(cadastre, 'cadastre')
    return (async () => {
        await Property.findByIdAndUpdate(id, fieldsToUpdate)
    })();
}