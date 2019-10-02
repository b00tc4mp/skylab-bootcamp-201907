const validate = require('utils/validate')
const { models: { Cache } } = require('data')

/**
 * retrieves a cache
 * @param {string} id 
 */

function retrieveCache(id) {
    
    validate.string(id, 'id')

    return (async () => {
        const cache = await Cache.findById(id)

        if (!cache) throw new Error(`cache with id ${id} not found`)
        
        cache.id = id

        cache.owner.id = cache.owner._id.toString()
        delete cache._id
        delete cache.owner._id

        return cache
         
    })()
}

module.exports = retrieveCache
