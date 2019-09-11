const validate = require('utils/validate')
const { models: { User, Cache } } = require('data')

function logCache(userId, cacheId) {
    
    validate.string(userId, 'user id')
    validate.string(cacheId, 'cache id')

    return (async () => {
        const cache = await Cache.findById(cacheId)
        if (!cache) throw new Error(`cache with id ${cacheId} not found`)
        const user = await User.findById(userId)
        if (!user) throw new Error(`user with id ${userId} not found`)

        user.found.push(cacheId)
        
        await user.save()

    })()
}

module.exports = logCache