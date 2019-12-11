const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const { User, Dog } = models

/**
 * Toggles favorite dog
 * 
 * @param {string} id
 * @param {string} dogId 
 * 
* @returns {Promise}
*/
module.exports = function (id, dogId) {

    validate.string(id, 'user ID')
    validate.string(dogId, 'dog ID')

    return (async () => {
        let user = await User.findById(id)
        const dog = await Dog.findById(dogId)
        if (!user) throw Error(`User with id ${id} not found`)
        if (!dog) throw Error(`Dog with id ${dogId} not found`)
        user.favorites.indexOf(dogId) > -1 ? user.favorites.splice(user.favorites.indexOf(dogId), 1) : user.favorites.push(dogId)
        await user.save()
    })()
}