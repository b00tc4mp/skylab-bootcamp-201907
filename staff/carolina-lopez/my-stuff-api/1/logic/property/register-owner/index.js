const validate = require('../../../utils/validate')
const { User, Property } = require('../../../models')
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

    return (async () => {

        const _property = await Property.findOne({ _id: propertyId })
        if (!_property) throw Error('Wrong property id provided.')
        property = _property
        const user = await User.findOne({ _id: ownerId })
        
        if (!user) throw Error('Wrong owner id provided.')
        const match = property.owners.find(owner => owner === ownerId)                
        if (match) throw Error(`Owner already registered in property with id ${propertyId}`)
        property.owners.push(ownerId)
        return await property.save()      
    })()
} 




