const validate = require('utils/validate')
const { models: { User, Cache } } = require('data')

function registerCache(userId, name, description, lat, lon, difficulty, terrain, hints) {
    
    validate.string(name, 'name')
    validate.string(description, 'description')
    validate.number(lat, 'lan')
    validate.number(lon, 'lon')
    validate.number(difficulty, 'difficulty')
    validate.number(terrain, 'terrain')
    validate.string(hints, 'hints')

    return (async () => {
        const [user, cache] = await Promise.all([User.findById(userId), Cache.findOne({ name })])

        if (!user) throw new Error(`user with id ${id} does not exist`)

        if (cache) throw new Error(`cache with name ${name} already exists`)

        const _cache = new Cache({ name, description, lat, lon, difficulty, terrain, hints })

        _cache.owner = userId

        const savedCache = await _cache.save()
        
        return savedCache.id
         
    })()
}

module.exports = registerCache