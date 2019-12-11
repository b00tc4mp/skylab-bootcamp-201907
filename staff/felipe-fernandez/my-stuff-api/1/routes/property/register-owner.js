const logic = require('../../logic')

module.exports = async (req, res) => {

    const { params: { propertyId, ownerId } } = req

    try {
        await logic.property.registerOwner(propertyId, ownerId)
        res.json({ message: `Owner with id ${ownerId} registered to property ${propertyId} successfully` })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}
