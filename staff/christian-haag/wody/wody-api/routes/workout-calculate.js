const logic = require('../logic')

module.exports = function (req, res) {
    const { userId } = req
    try {
        logic.calculateWorkout(userId)
            .then(() => res.status(201).json({ message: 'workout correctly generated' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}