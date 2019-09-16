const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { id, spaceId } } = req

    try {
        logic.retrieveAllSpaceTasks(id, spaceId)
            .then(spaceTasks => res.json({ message: 'tasks retrieved correctly', spaceTasks }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 

