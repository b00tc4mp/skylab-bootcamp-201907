
const logic = require('../../logic')

module.exports = (req, res) => {

    const { userId, body } = req
debugger
    try {
        logic.updateUser(userId, body)
            .then(() => res.header('Access-Control-Allow-Origin', '*'))
            .then(() => res.json({ message: 'User updated successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
        } catch({ message }) {
                res.status(404).json({ error: message })
        }
}
