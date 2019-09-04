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

module.exports = function (propertyId, ownerId) {

    let _property

    validate.string(propertyId, 'Property ID')
    validate.string(ownerId, 'Owner ID')

    return (async () => {
        const property = await Property.findOne({ _id: propertyId })
        if (!property) throw Error('Wrong property id provided.')
        _property = property
        const user = await User.findOne({ _id: ownerId })
        if (!user) throw Error('Wrong owner id provided.')
        const match = _property.owners.find(owner => owner.toString() === ownerId)
        if (!match) throw Error(`User with id ${ownerId} is not an owner.`)
        _property.owners.splice(_property.owners.indexOf(match), 1)
        await _property.save()
    })()
}