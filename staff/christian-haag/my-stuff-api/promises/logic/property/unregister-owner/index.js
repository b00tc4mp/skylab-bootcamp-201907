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



    validate.string(propertyId, 'propId')
    validate.string(ownerId, 'ownerId')

    return Promise.all([Property.findOne({ _id: propertyId }), User.findOne({ _id: ownerId })])
        .then(([property, user]) => {
            if (!property) throw Error('wrong property id provided.')


            if (!user) throw Error('wrong owner id provided.')

            const match = property.owners.find(owner => owner.toString() === ownerId)

            if (!match) throw Error(`user with id ${ownerId} is not an owner.`)


            property.owners.splice(property.owners.indexOf(match), 1)

            return property.save()
        })
}