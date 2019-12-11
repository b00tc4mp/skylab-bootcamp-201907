const validate = require('utils/validate')
const { models: { User, Cache } } = require('data')

/**
 * favorite or unfavorite a cache
 * @param {string} userId 
 * @param {string} cacheId 
 */

function toggleFavorite(userId, cacheId ) {
    validate.string(userId, 'user idd')
    validate.string(cacheId, 'cache id')
   
    return (async () => {
        const cache = await Cache.findById(cacheId)
        if (!cache) throw new Error(`cache with id ${cacheId} not found`)
        const user = await User.findById(userId)
        if (!user) throw new Error(`user with id ${userId} not found`)

        if (user.owned.includes(cacheId)) throw new Error('cant favorite your own cache')

        const favorite = user.favorites.indexOf(cacheId)
        if (favorite === -1) user.favorites.push(cacheId)
        else user.favorites.pull(cacheId)
        
        await user.save()

    })()
}

module.exports = toggleFavorite