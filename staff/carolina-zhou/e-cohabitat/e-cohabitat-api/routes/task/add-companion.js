const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { taskId, spaceId, companionId } } = req

    try {
        logic.addCompanion(taskId, spaceId, companionId)
            .then(() => res.json({ message: `user with id ${companionId} added to task ${taskId} in space ${spaceId} successfully`}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
