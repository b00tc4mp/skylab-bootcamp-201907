const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { taskId } } = req

    try {
        logic.retrieveTask(taskId)
            .then(space => res.json({ message: 'task retrieved correctly', space }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 

