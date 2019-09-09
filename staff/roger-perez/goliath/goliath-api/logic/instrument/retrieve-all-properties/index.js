const validate = require('../../../utils/validate')
const { Property } = require('../../../data')

/**
 * Retrieves all the properties by their owner's user id
 * 
 * @param {*} id 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'user id')

    return Property.find({ owner : id }, { __v: 0 }).lean()
        .then(properties => {
            if (!properties) throw Error(`user with id ${id} does not own any car.`)
            properties.forEach(property => {
                property.id = property._id
                delete property._id
            })
            return property
        })
}