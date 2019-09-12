const logic = require('../../logic/cache')

async function retrieveAllCaches (req, res) {
    
    const { userId } = req
    debugger
    try {
        const caches = await logic.retrieveAllCaches(userId)
        res.json({ message: 'caches retrieved correctly', caches })

    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}

module.exports = retrieveAllCaches