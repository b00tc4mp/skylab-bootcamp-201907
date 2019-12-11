const validate = require('utils/validate')
const { models: { User, Cache } } = require('data')

/**
 * retrieves all caches, user must be logged in
 * @param {string} userId 
 */

function retrieveAllCaches(userId) {
    
    validate.string(userId, 'user id')

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new Error(`user does not exist`)
        
        const caches = Cache.find()
    
        return caches
         
    })()
}

module.exports = retrieveAllCaches
