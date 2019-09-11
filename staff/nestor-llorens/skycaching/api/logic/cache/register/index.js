const validate = require('utils/validate')
const { models: { User, Cache } } = require('data')

function registerCache(userId, name, description, location, difficulty, terrain, hints) {
    
    validate.string(userId, 'user id')
    validate.string(name, 'name')
    validate.string(description, 'description')
    validate.number(difficulty, 'difficulty')
    validate.number(terrain, 'terrain')
    validate.string(hints, 'hints')

    if (location.coordinates[0] === 0 && location.coordinates[1] === 0) throw new Error(`cache coordinates not found`)

    return (async () => {
        let [user, cache, cacheLoc] = await Promise.all([User.findById(userId), Cache.findOne({ name }), Cache.findOne({ location })])

        if (!user) throw new Error(`user with id ${id} does not exist`)

        if (cache) throw new Error(`cache with name ${name} already exists`)

        if (cacheLoc) throw new Error(`there is already a cache on ${location.coordinates}`)

        const _cache = new Cache({ owner: userId, name, description, location, difficulty, terrain, hints })

        await _cache.save()

        return _cache.id
    })()
}

module.exports = registerCache