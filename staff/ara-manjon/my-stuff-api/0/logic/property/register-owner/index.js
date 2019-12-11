const validate = require('../../../utils/validate')
const { User, Property } = require('../../../data')

/**
 * Registers a user in a property by their id
 * 
 * @param {string} propertyId
 * @param {string} ownerId 
 * 
 * @returns {Promise}
*/

module.exports = function(propertyId, ownerId) {

    let property

    validate.string(propertyId, 'Property id')
    validate.string(ownerId, 'Owner id')

    return Property.findOne({ _id: propertyId })
        .then(_property => {
            if (!_property) throw Error('Wrong property id provided.')
            property = _property
            return User.findOne({ _id: ownerId })
        })
        .then(user => {
            if (!user) throw Error('Wrong owner id provided.')
            const match = property.owners.find(owner => owner === ownerId)
            if (match) throw Error(`Owner already registered in property with id ${propertyId}`)
            property.owners.push(ownerId)
            return property.save()
        })
} 