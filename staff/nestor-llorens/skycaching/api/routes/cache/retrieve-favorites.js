const logic = require('../../logic/cache')

async function retrieveFavorites (req, res) {
    
    const { userId } = req

    try {
        const favorites = await logic.retrieveFavorites(userId)
        res.json({ message: 'favorites retrieved correctly', favorites })

    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}

module.exports = retrieveFavorites