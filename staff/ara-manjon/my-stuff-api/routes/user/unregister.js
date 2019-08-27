const logic = require('../../logic')

module.exports = function (req, res) {
    const { params: { id }, body: { password } } = req

    try {
        logic.user.unregister(id, password)
            .then(() => res.json({ message: 'user correctly unregistered' }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}