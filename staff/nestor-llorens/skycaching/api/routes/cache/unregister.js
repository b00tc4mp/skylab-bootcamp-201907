const logic = require('../../logic/cache')

async function unregisterCache (req, res) {
    
    const { userId, params: { cacheId }} = req

    try {
        debugger
        await logic.unregisterCache(userId, cacheId)
        res.json({ message: 'cache correctly unregistered' })

    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}

module.exports = unregisterCache