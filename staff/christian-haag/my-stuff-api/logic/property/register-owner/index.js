const validate = require('../../../utils/validate')
const { User, Property } = require('../../../data')

/**
 * @param {String} propertyId
 * @param {String} userId
 * 
 * @return {Promise}
 */

module.exports = function (propertyId, ownerId) {
    validate.string(propertyId, 'property id')
    validate.string(userId, 'user id')

    let _property

    return Property.findById(propertyId)
        .then(property => {
            if (!property) throw new Error(`property does not exist`)

            _property = property

            return User.findById(ownerId)
        })
        .then(user => {
            if (!user) throw new Error('wrong owner id')
            const userFound = _property.owners.find(owner => owner.toString() === ownerId)
            if (userFound) throw new Error('owner already exist')
            _property.owners.push(ownerId)
            return _property.save()
        })
}