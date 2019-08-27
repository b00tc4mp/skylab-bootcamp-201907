const validate = require('../../../utils/validate')
const { Property } = require('../../../models')

/**
 * Unregisters a user by their id
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {

    validate.string(id, 'Property ID')

    return Property.deleteOne({ _id: id })
        .then(result => {
            if (!result.deletedCount) throw Error(`Property with id ${id} does not exist.`)
        })
}