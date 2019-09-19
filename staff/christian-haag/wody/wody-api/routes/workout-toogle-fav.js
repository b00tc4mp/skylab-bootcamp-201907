const logic = require('../logic')

module.exports = function (req, res) {
    const { userId, params: { workoutId } } = req

    try {
        logic.favWorkout(workoutId, userId)
            .then(() => res.status(201).json({ message: 'Favorite correctly set' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}