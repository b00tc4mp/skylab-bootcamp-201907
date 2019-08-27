const validate = require('../../../utils/validate')
const { User, Property } = require('../../../data')

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

    validate.string(propertyId, 'Property id')
    validate.string(ownerId, 'Owner id')

    return Property.findOne({ _id: propertyId })
        .then(property => {
            if (!property) throw Error('wrong property id provided.')
            _property = property
            return User.findOne({ _id: ownerId })
        })
        .then(user => {
            if (!user) throw Error('wrong owner id provided.')
            const match = _property.owners.find(owner => owner.toString() === ownerId)
            if (!match) throw Error(`user with id ${ownerId} is not an owner.`)
            _property.owners.splice(_property.owners.indexOf(match))
            return _property.save()
        })
}