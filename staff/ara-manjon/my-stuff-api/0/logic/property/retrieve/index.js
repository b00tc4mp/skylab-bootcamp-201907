const validate = require('../../../utils/validate')
const { Property } = require('../../../data')

/**
 * Retrieve a propert by user id.
 * @param {*} id
 * 
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'Property id')

    return Property.findOne({ _id: id }, { _id: 0 }).lean()
        .then(property => {
            if (!property) throw Error(`Property with id ${id} does not exist.`)
            property.id = id
            return property
        })
}