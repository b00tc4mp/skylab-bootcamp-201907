const validate = require('../../../utils/validate')
const { Property, User } = require('../../../data')

/**
 * Unregister  card
 * 
 * @param {id} id
 * 
 * @return {Promise}
 *  
 */

module.exports = function (propId, ownerId) {

    validate.string(propId, 'propId')
    validate.string(ownerId, 'ownerId')

    return (async () => {
        const [property, user] = await Promise.all([Property.findById(propId), User.findById(ownerId)])


        if (!property) throw new Error(`property does not exist`)
        if (!user) throw new Error('No permission to add new owner')

        const userFound = property.owners.find(owner => owner.toString() !== ownerId)

        if (userFound) throw new Error('No permission to unregister property')

        const result = await Property.deleteOne({ _id: propId })

        if (!result.deletedCount) throw new Error(`wrong credentials`)


    })()
}
