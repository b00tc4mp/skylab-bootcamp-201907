const logic = require('../../logic/cache')

async function retrieveLog (req, res) {
    
    const { userId } = req

    try {
        const log = await logic.retrieveLog(userId)
        res.json({ message: 'log retrieved correctly', log })

    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}

module.exports = retrieveLog