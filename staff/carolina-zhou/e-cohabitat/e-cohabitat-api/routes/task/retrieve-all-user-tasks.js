const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { id } } = req

    try {
        logic.retrieveAllUserTasks(id)
            .then(userTasks => res.json({ message: 'tasks retrieved correctly', userTasks }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 

