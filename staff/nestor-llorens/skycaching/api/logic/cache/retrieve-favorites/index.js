const validate = require('utils/validate')
const { models: { User } } = require('data')

/**
 * retrieves user favoreites caches
 * @param {string} userId 
 */

function retrieveFavorites(userId) {
    validate.string(userId, 'userId')
   
    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw new Error(`user with id ${userId} not found`)
        if (user.favorites.length === 0) throw new Error(`user with id ${userId} does not have favorites`)
        
        return user.favorites
    })()
}

module.exports = retrieveFavorites