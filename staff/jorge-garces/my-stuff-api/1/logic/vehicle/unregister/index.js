const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../models')
/**
 * Unregisters a vehicle by their id
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
*/
module.exports = function (id) {
    validate.string(id, 'Vehicle id')

    return (async () => {
        const response = await Vehicle.deleteOne({ _id: id })
        if (!response.deletedCount) throw Error(`Wrong id provided.`)
    })()
}