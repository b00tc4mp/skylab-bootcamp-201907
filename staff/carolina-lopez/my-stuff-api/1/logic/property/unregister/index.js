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

    validate.string(id, 'id')

    return (async () => {
        const property = await Property.deleteOne({ _id: id })
        if (!property.deletedCount) throw Error('wrong credentials')
    })()
}