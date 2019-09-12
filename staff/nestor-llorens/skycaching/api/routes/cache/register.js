const logic = require('../../logic/cache')

async function registerCache (req, res) {
    
    const { userId, body: { name, description, location, difficulty, terrain, hints } } = req

    try {
    
        const cacheId = await logic.registerCache(userId, name, description, location, difficulty, terrain, hints )
        res.status(201).json({ message: 'cache correctly registered', cacheId })

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}

module.exports = registerCache