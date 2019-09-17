const logic = require('../../logic/user')

async function retrieveUser (req, res) {
    debugger
    const { params: {userId}  } = req

    try {
        const user = await logic.retrieveUser(userId)
        res.json({ message: 'user retrieved correctly', user })

    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}

module.exports = retrieveUser