const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { id, spaceId, taskId } } = req

    try {
        logic.retrieveTask(id, spaceId, taskId)
            .then(task => res.json({ message: 'task retrieved correctly', task }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 

