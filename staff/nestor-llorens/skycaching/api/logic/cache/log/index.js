const validate = require('utils/validate')
const { models: { User, Cache, Comment } } = require('data')

/**
 * Logs the cache on a user and leaves a comment on the chache details
 * @param {string} userId 
 * @param {string} cacheId 
 * @param {string} commentString 
 */

function logCache(userId, cacheId, commentString ) {
    
    validate.string(userId, 'user id')
    validate.string(cacheId, 'cache id')
    validate.string(commentString, 'comment')

    return (async () => {
        const cache = await Cache.findById(cacheId)
        if (!cache) throw new Error(`cache with id ${cacheId} not found`)
        const user = await User.findById(userId)
        if (!user) throw new Error(`user with id ${userId} not found`)

        if (user.owned.includes(cacheId)) throw new Error('cant log your own cache')

        if (cache.comments.some(comment => comment.username === user.username))
        throw new Error('cache already logged')

        const date = new Date().toLocaleString()
        
        const comment = new Comment({'username': user.username, date, 'comment': commentString})

        cache.comments.push(comment)
        
        await cache.save()

        user.found.push(cacheId)
        
        await user.save()

    })()
}

module.exports = logCache