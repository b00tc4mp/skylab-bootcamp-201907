const validate = require('../../../utils/validate')
const { Property } = require('../../../models')

/**
 * 
 * @param {*} id
 * 
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'Property ID')

    return (async () => {
        const property = await Property.findOne({ _id: id }, { _id: 0 }).lean()
        if (!property) throw Error(`Property with id ${id} does not exist.`)
        property.id = id
        return property
    })()
}