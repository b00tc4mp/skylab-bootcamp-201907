const logic = require('../../logic/user')

async function registerUser (req, res) {
    
    const { body: { username, password, email } } = req

    try {
    
        await logic.registerUser(username, password, email)
        res.status(201).json({ message: 'user correctly registered' })

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}

module.exports = registerUser