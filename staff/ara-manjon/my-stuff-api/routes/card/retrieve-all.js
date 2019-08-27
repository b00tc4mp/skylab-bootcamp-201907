const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { id } } = req

    try {
        logic.property.retrieveAll(id)
            .then(vehicles => res.json({ message: 'Vehicles retrieved correctly', vehicles }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 

