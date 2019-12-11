const logic = require('../../logic/cache')

async function retrieveCache (req, res) {
    
    const { cacheId } = req.params

    try {
        const cache = await logic.retrieveCache(cacheId)
        res.json({ message: 'cache retrieved correctly', cache })

    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}

module.exports = retrieveCache