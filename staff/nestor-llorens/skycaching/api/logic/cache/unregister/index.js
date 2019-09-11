const validate = require('utils/validate')
const { models: { User, Cache } } = require('data')


function unregisterCache (userId, password, cacheId) {
    
    validate.string(userId, 'user id')
    validate.string(password, 'password')
    validate.string(cacheId, 'cache id')

    return (async () => {

    const [user, cache] = await Promise.all([User.findById(userId), Cache.findById(cacheId)])

    if (!user) throw new Error(`user with id ${userId} not found`)
    if (!cache) throw new Error(`cache with id ${cacheId} does not exist`)
    if (user.password !== password) throw new Error("wrong credentials")
    if (user.id != cache.owner._id.toString()) throw new Error(`${userId} is not the cache owner`)
    const result = await Cache.deleteOne({ '_id': cacheId })
    
    if (!result.deletedCount) throw new Error(`could not delete ${cacheId}`)
    })()
    
}

module.exports = unregisterCache