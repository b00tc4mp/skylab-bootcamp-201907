const logic = require('../logic')
const jwt = require('jsonwebtoken')

const { env: { JWT_SECRET } } = process

module.exports = (req, res) => {
    const { body: { email, password } } = req

    try {
        logic.authenticateUser(email, password)
            .then(id => {
                const token = jwt.sign({ sub: id }, JWT_SECRET)

                res.json({ message: 'user correctly authenticated', id, token })
                //status is 200 by default (also if we don not specify)

            })
            .catch(({ message }) => res.status(401).json({ error: message }))
    } catch ({ message }) {
        res.status(401).json({ error: message })
    }
}