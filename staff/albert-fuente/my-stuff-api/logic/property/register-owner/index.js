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

    validate.string(propertyId, 'Property id')
    validate.string(ownerId, 'Owner id')

    return(async()=>{
        const property= await Property.findOne({ _id: propertyId })

            if (!property) throw Error('Wrong property id provided.')
            _property = property
            const user=await User.findOne({ _id: ownerId })

                    if (!user) throw Error('Wrong owner id provided.')
                    const match = _property.owners.find(owner => owner === user.id)
                    if (match) throw Error(`Owner already registered in property with id ${propertyId}`)
                    _property.owners.push(user.id)
                    await _property.save()

                            return propertyId
                      
    
    })()

 /*    return Property.findOne({ _id: propertyId })
        .then(property => {
            debugger
            if (!property) throw Error('Wrong property id provided.')
            _property = property
            return User.findOne({ _id: ownerId })
                .then(user => {
                    if (!user) throw Error('Wrong owner id provided.')
                    const match = _property.owners.find(owner => owner === user.id)
                    if (match) throw Error(`Owner already registered in property with id ${propertyId}`)
                    _property.owners.push(user.id)
                    return _property.save()
                        .then(() => {
                            return propertyId
                        })
                    debugger
                })
        }) */
}





/* return Property.findOne({ _id: propertyId })
.then(property => {
    debugger
    if (!property) throw Error('Wrong property id provided.')
    _property = property
    return User.findOne({ _id: ownerId })
        .then(user => {
            if (!user) throw Error('Wrong owner id provided.')
            const match = _property.owners.find(owner => owner === user.id)
            if (match) throw Error(`Owner already registered in property with id ${propertyId}`)
            _property.owners.push(user.id)
            return _property.save()
                .then(() => {
                    return propertyId
                })
            debugger
        })
}) */