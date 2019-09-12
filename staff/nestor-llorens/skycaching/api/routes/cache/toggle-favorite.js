const logic = require('../../logic/cache')

async function toggleFavorite (req, res) {
    
    const { userId, params: { cacheId } } = req

    try {
        await logic.toggleFavorite(userId, cacheId)
        res.json({ message: 'cache favorite toggled correctly' })

    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}

module.exports = toggleFavorite