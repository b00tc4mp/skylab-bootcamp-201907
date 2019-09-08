const logic = require('../../logic')

module.exports = function(req, res) {

    const { body: { taskName, taskType, description, date }, params: { spaceId, userId } } = req

    try {
        logic.addTask(taskName, taskType, description, date, spaceId, userId)
            .then(() => res.status(201).json({ message: 'task added successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}