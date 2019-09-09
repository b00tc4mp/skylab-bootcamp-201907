const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { spaceId } } = req

    try {
        logic.retrieveSpace(spaceId)
            .then(space => res.json({ message: 'space retrieved correctly', space }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 

