const validate = require('../../../utils/validate')
const { User, Property } = require('../../../models')

/**
 * Unregisters a user by their id
 * 
 * @param {string} propertyId
 * @param {string} ownerId 
 * 
 * @returns {Promise}
*/

module.exports = function(propertyId, ownerId) {

    let _property

    validate.string(propertyId, 'Property ID')
    validate.string(ownerId, 'Owner ID')

    return Property.findOne({ _id: propertyId })
        .then(property => {
            if (!property) throw Error(`Property with id ${propertyId} does not exist.`)
            _property = property
            return User.findOne({ _id: ownerId })
        })
        .then(user => {
            if (!user) throw Error(`User with id ${ownerId} does not exist.`)
            const match = _property.owners.find(owner => owner === ownerId)
            if (match) throw Error(`Owner already registered in property with id ${propertyId}`)
            _property.owners.push(ownerId)
            return _property.save()
        })
        .then(() => { })
}