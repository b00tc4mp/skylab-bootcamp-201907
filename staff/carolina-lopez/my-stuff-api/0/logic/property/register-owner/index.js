// const validate = require('../../../utils/validate')
// const { User, Property } = require('../../../models')
// /**
//  * Registers a user in a property by their id
//  * 
//  * @param {string} propertyId
//  * @param {string} ownerId 
//  * 
//  * @returns {Promise}
// */

// module.exports = function(propertyId, ownerId) {
//     let property
//     validate.string(propertyId, 'Property id')
//     validate.string(ownerId, 'Owner id')
//     return Property.findOne({ _id: propertyId })

//         .then(_property => {

//             if (!_property) throw Error('Wrong property id provided.')

//             property = _property
//             return User.findOne({ _id: ownerId })
//         })
//         .then(user => {

//             if (!user) throw Error('Wrong owner id provided.')
//             const match = property.owners.find(owner => owner === ownerId)
//             if (match) throw Error(`Owner already registered in property with id ${propertyId}`)
//             property.owners.push(ownerId)
//             return property.save()
//         })
// } 




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

module.exports = function (propertyId, ownerId, newOwnerId) {

    let _property

    validate.string(propertyId, 'Property id')
    validate.string(ownerId, 'Owner id')

    return (async () => {

        const property = await Property.findOne({
            _id: propertyId
        })

        if (!property) throw Error('Wrong property id provided.')
        _property = property


        const user = await User.findOne({
            _id: ownerId
        })
        
        if (!user) throw Error('Wrong owner id provided.')
        const alreadyExist = _property.owners.find(owner => 
            owner._id.toString() === newOwnerId
        )
        if (alreadyExist) throw Error(`User with ID ${ownerId} is already an owner of the property ${propertyId}`)


        const match = _property.owners.find(owner => 
            owner._id.toString() === ownerId
        )
        if (!match) throw Error(`User with ID ${ownerId} is not an owner of the property ${propertyId}`)
        _property.owners.push(newOwnerId)
        await _property.save()
    })()
}



