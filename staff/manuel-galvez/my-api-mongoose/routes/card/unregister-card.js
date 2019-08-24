const logic = require('../logic')

module.exports = (req, res) => {

    const { params: { id }, body: { email, password } } = req

    try {
        logic.unregisterUser(id, email, password)
            .then(() => res.json({ message: 'User unregistered successfully'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
