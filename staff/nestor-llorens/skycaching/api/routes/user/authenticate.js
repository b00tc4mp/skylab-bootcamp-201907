const logic = require('../../logic/user')
const jwt = require('jsonwebtoken')

const { env: { JWT_SECRET } } = process

async function authenticateUser(req, res) {
    
    const { body: { username, password } } = req

    try {
        const id = await logic.authenticateUser(username, password)

        const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: '24h' })

        res.json({ message: 'user correctly authenticated', token })
    }
    catch ({ message }) {
        res.status(401).json({ error: message })
    }
}

module.exports = authenticateUser