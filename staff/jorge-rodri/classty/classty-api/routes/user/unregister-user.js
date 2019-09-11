const { users } = require('../../logic')

module.exports = function (req, res) {
    const { userId, body: { password } } = req

    try {
        users.unregisterUser(userId, password)
            .then(() => res.json({ message: 'user correctly unregistered' }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}