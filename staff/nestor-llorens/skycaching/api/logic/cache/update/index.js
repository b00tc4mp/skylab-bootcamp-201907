const validate = require('utils/validate')
const { models: { User, Cache } } = require('data')


function updateCache (userId, cacheId, data) {

    validate.string(userId, 'id')
    validate.string(cacheId, 'cache id')

    return (async () => {

    const user = await User.findById(userId)

    if (!user) throw new Error(`user with id ${userId} not found`)

    const cache = await Cache.findByIdAndUpdate(cacheId, { $set: data })
    if (!cache) throw new Error(`cache with id ${cacheId} not found`)
    })()
}

module.exports = updateCache