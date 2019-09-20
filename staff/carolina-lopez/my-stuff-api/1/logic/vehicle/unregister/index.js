const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../models')

/**
 * Unregisters a user by their id
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
*/

module.exports = function (id) {

    validate.string(id, 'vehicle id')

    return (async () => {

        const vehicle = await Vehicle.deleteOne({ _id: id })
        if (!vehicle.deletedCount) throw Error(`wrong credentials`)
    })()
}