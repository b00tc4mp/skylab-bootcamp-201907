const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { taskId }, body } = req

    try {
        logic.editTask(taskId, body)
            .then(() => res.json({ message: 'task edited successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}


