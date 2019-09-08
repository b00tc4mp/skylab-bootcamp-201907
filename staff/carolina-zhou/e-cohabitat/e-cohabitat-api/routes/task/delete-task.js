const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { userId, taskId } } = req

    try {
        logic.deleteTask(userId, taskId)
            .then(() => res.json({ message: 'task deleted successfully'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
