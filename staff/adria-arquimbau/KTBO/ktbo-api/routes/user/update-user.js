const logic = require('../../logic')

module.exports = function (req, res) {
    const { userId , body  } = req

    try {
        logic.updateUser(userId, body)
            .then((user) => res.json({ message: 'user correctly updated' }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}