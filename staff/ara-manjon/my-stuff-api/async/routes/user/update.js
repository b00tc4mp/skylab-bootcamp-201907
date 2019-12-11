const logic = require('../../logic')

module.exports = function (req, res) {
    const { params: { id }, body  } = req

    try {
        logic.user.update(id, body)
            .then(() => res.json({ message: 'User updated successfully'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}