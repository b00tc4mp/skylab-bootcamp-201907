
const logic = require('../../logic')

module.exports = (req, res) => {

    const { userId, body: { longitude, latitude } } = req

    try {
        logic.updateStatic(userId, longitude, latitude)
            .then(() => res.json({ message: 'Static location updated successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
        } catch({ message }) {
                res.status(404).json({ error: message })
        }
}
