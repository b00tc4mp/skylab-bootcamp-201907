const validate = require('utils/validate')
const { models: { Cache } } = require('data')

function retrieveCache(id) {
    
    validate.string(id, 'id')

    return (async () => {
        const cache = await Cache.findOne({ _id: id })

        if (!cache) throw new Error(`cache with id ${id} not found`)
        
        cache.id = id
        
        return cache
         
    })()
}

module.exports = retrieveCache
