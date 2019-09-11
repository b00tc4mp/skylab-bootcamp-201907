const validate = require('utils/validate')
const { models: { User, Cache } } = require('data')

function retrieveAllUserCaches(userId) {
    
    validate.string(userId, 'user id')

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new Error(`user does not exist`)
        
        const caches = Cache.find({ owner: id})
    
        return caches
         
    })()
}

module.exports = retrieveAllUserCaches
