const logic = require('../../logic')

module.exports = (req, res) => {

    const { userId, body: { distance }} = req

    try {
        logic.retrieveAllStatic(userId, distance)
            .then(static => res.json({ message: 'Static location retrieved correctly', static }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 