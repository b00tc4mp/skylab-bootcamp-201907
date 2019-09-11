const logic = require('../../logic/user')
const jwt = require('jsonwebtoken')

const { env: { JWT_SECRET } } = process

module.exports = (req, res) => {
    const { body: { username, password } } = req

    try {
        logic.authenticateUser(username, password)
            .then(id => {
                const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: '24h' })

                res.json({ message: 'user correctly authenticated', token })
            })
            .catch(({ message }) => res.status(401).json({ error: message }))
    } catch ({ message }) {
        res.status(401).json({ error: message })
    }
}