const validate = require('../../../utils/validate')
const { Property } = require('../../../data')

/**
 * Retrieve all properties by user id.
 * @param {*} id 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'User id')
    return Property.find({ owner : id }, { __v: 0 }).lean()
        .then(properties => { 
            if (!properties) throw Error(`User with id ${userId} does not own any property.`)
            properties.forEach(property => {
                property.id = property._id
                delete property._id
            })
            return properties
        })
}