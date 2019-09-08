const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { propertyId } } = req

    try {
        logic.property.unregister(propertyId)
            .then(() => res.json({ message: 'Property unregistered successfully'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
