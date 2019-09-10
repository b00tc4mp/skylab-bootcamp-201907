const unregisterUser = require('../../logic/user/unregister')

module.exports = (req, res) => {
debugger
    const { userId , body: { password } } = req

    try {
        unregisterUser(userId, password)
            .then(() => res.json({ message: 'User unregistered successfully'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
