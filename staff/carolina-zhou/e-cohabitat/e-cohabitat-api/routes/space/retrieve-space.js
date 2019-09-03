const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { propertyId } } = req

    try {
        logic.retrieveProperty(propertyId)
            .then(property => res.json({ message: 'Property retrieved correctly', property }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 

