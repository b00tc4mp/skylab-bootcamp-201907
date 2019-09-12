const logic = require('../../logic/cache')

async function logCache (req, res) {
    
    const { userId, params: { cacheId }} = req

    try {
        
        await logic.logCache(userId, cacheId)
        res.json({ message: 'cache logged correctly' })

    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}

module.exports = logCache