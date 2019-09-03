const logic = require('../logic')

module.exports = function (req, res) {
    const { params: { id }, body: { password } } = req

    try {
        logic.unregisterUser(id, password)
            .then(() => res.json({ message: 'User correctly unregistered. See you soon!' }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}