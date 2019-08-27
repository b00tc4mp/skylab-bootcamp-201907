const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { id } } = req

    try {
        logic.property.retrieveAll(id)
            .then(properties => res.json({ message: 'Properties retrieved correctly', properties }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 

