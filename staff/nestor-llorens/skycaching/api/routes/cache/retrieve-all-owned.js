const logic = require('../../logic/cache')

async function retrieveAllOwnedCaches (req, res) {
    
    const { userId } = req
    debugger
    try {
        const caches = await logic.retrieveAllOwnedCaches(userId)
        res.json({ message: 'owned caches retrieved correctly', caches })

    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}

module.exports = retrieveAllOwnedCaches