const logic = require('../../logic/user')

async function unregisterUser (req, res) {
    
    const { userId, body: { password } } = req

    try {
        await logic.unregisterUser(userId, password)
        res.json({ message: 'user correctly unregistered' })

    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}

module.exports = unregisterUser