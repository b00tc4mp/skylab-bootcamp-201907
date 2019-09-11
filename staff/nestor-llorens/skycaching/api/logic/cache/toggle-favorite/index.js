const validate = require('utils/validate')
const { models: { User, Cache } } = require('data')


function toggleFavoriteCache(userId, cacheId ) {
    validate.string(userId, 'userId')
    validate.string(cacheId, 'cacheId')
   
    return (async () => {
        const cache = await Cache.findById(cacheId)
        if (!cache) throw new Error(`cache with id ${cacheId} not found`)
        const user = await User.findById(userId)
        if (!user) throw new Error(`user with id ${userId} not found`)
        const favorite = user.favorites.indexOf(cacheId)
        if (favorite === -1) user.favorites.push(cacheId)
        else user.favorites.pull(cacheId)
        
        await user.save()

    })()
}

module.exports = toggleFavoriteCache