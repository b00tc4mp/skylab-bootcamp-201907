const logic = require('../logic')

module.exports = (req, res) => {
    const { userId } = req

    try {
        logic.retrieveUser(userId)
            .then(user => res.json({ message: 'user retrieved correctly', user }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}