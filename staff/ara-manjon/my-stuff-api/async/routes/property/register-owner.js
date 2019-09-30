const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { propertyId, ownerId } } = req

    try {
        logic.property.registerOwner(propertyId, ownerId)
            .then(() => res.json({ message: `Owner with id ${ownerId} registered to property ${propertyId} successfully`}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
