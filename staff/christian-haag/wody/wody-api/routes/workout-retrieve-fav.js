const logic = require('../logic')

module.exports = async (req, res) => {

    const { userId } = req

    try {
        await logic.retrieveFavWorkout(userId)
            .then(workouts => res.json({ message: 'Workouts retrieved correctly', workouts }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

}
