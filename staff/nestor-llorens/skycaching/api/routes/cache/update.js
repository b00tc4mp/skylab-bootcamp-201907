const logic = require('../../logic/cache')

async function updateCache (req, res) {
    const { userId, body, params: {cacheId} } = req

    try {
        await logic.updateCache(userId, cacheId, body)
        res.json({ message: 'cache correctly updated' })

    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}

module.exports = updateCache