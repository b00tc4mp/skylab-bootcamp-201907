const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../models')

/**
 * Unregisters a user by their id
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {

    validate.string(id, 'Vehicle id')

    return Vehicle.deleteOne({ _id: id })
        .then(response => {
            if (!response.deletedCount) throw Error(`Wrong id provided.`)
        })
}