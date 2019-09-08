const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { taskId, companionId } } = req

    try {
        logic.removeTaskCompanion(taskId, companionId)
            .then(() => res.json({ message: `user with id ${companionId} removed from task with id ${taskId} successfully`}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
