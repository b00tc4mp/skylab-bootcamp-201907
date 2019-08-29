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


    return (async () => {
        const property = await Property.findOne({ _id: propertyId })
        if (!property) throw Error(`Property with id ${propertyId} does not exist.`)
        const user = await User.findOne({ _id: ownerId })
        if (!user) throw Error(`User with id ${ownerId} does not exist.`)
        const match = property.owners.find(owner => owner === ownerId)
        if (match) throw Error(`Owner already registered in property with id ${propertyId}`)
        property.owners.push(ownerId)
        await property.save()
    })()
}