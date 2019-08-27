const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { id }, headers: { authorization } } = req

    const token = authorization.slice(authorization.indexOf(' ') + 1)

    try {
        jwt.verify(token, secret)

        logic.retrieveUsers(id)
            .then(user => res.json({ message: 'user retrieved correctly', user }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}