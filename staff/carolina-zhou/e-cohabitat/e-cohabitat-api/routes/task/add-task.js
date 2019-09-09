const logic = require('../../logic')

module.exports = function(req, res) {

    const { body: { taskName, taskType, description, date }, params: { spaceId, id } } = req

    try {
        const _date = new Date(date) 
        logic.addTask(taskName, taskType, description, _date, spaceId, id)
            .then(() => res.status(201).json({ message: 'task added successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}