const logic = require('../logic')

module.exports = function (req, res) {
    const { params: { id }, headers: { authorization }, body: update } = req

    try {
        logic.updateUser(id, update)
            .then(() => res.json({ message: 'update user' }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}