const logic = require('../../logic/cache')

async function logCache (req, res) {
    
    const { userId, params: { cacheId }, body: { comment}} = req

    try {
        
        await logic.logCache(userId, cacheId, comment)
        res.json({ message: 'cache logged correctly' })

    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}

module.exports = logCache