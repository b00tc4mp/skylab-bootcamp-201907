const logic = require('../logic')

module.exports = (req, res) => {

    const { params: { id }, body } = req

    try {
        logic.updateUser(id, body)
            .then(() => res.json({ message: 'User updated successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
        } catch({ message }) {
                res.status(404).json({ error: message })
        }
}


