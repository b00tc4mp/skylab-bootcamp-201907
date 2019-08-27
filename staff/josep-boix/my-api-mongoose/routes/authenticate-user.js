const logic = require('../logic')
const jwt = require('jsonwebtoken')

const { env: { JWT_SECRET } } = process

module.exports = (request, response) => {
    const { body: { email, password } } = request

    try {
        logic.authenticateUser(email, password)
            .then(id => {
                const token = jwt.sign({ sub: id }, JWT_SECRET)

                response.json({ message: 'user correctly authenticated', id, token })
                //status is 200 by default (also if we don not specify)

            })
            .catch(({ message }) => response.status(401).json({ error: message }))
    } catch ({ message }) {
        response.status(401).json({ error: message })
    }
}