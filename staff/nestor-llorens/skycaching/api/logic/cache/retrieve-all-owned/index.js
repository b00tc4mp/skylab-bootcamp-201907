const validate = require('utils/validate')
const { models: { User, Cache } } = require('data')

/**
 * retrieves all caches owned by the user
 * @param {string} userId 
 */

function retrieveAllUserCaches(userId) {
    
    validate.string(userId, 'user id')

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new Error(`user does not exist`)
        
        const caches = Cache.find({ owner: userId})
    
        return caches
         
    })()
}

module.exports = retrieveAllUserCaches
