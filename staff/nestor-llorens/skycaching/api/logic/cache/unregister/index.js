const validate = require('utils/validate')
const { models: { User, Cache } } = require('data')


function unregisterCache (userId, cacheName) {
    
    validate.string(userId, 'id')
    validate.string(cacheName, 'cacheName')

    return (async () => {

    const [user, cache] = await Promise.all([User.findById(userId), Cache.findOne({ name: cacheName })])
    debugger
    if (!user) throw new Error(`user with id ${userId} not found`)
    if (!cache) throw new Error(`cache with name ${cacheName} does not exist`)
    const result = await Cache.deleteOne({ name: cacheName, owner: user._id })

    if (!result.deletedCount) throw new Error(`wrong credentials`)
    })()
    
}

module.exports = unregisterCache