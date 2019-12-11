const logic = require('../../logic/user')

async function addLocation (req, res) {
    const { userId, body: { location }  } = req
    debugger
    try {
        await logic.addLocation(userId, location)
        res.json({ message: 'user location added succesfully' })

    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}

module.exports = addLocation