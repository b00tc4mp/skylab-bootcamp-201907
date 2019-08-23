const logic = require('../logic')
const jwt = require('jsonwebtoken')

const { env: { JWT_SECRET: secret } } = process

module.exports = function(req, res) {
    const { body: { email, password } } = req

    try {
        logic.authenticateUser(email, password)
            .then(id => {
                const token = jwt.sign({ sub: id }, secret)

                res.json({ message: 'user correctly authenticated', id, token })
            })
            .catch(({ message }) => res.status(401).json({ error: message }))
    } catch ({ message }) {
        res.status(401).json({ error: message })
    }
}