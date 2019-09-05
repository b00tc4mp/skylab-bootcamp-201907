const logic = require('../../logic/user')

module.exports = function (req, res) {
    const { params: { id }, body  } = req

    try {
        logic.updateUser(id, body)
            .then(() => res.json({ message: 'user correctly updated' }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}