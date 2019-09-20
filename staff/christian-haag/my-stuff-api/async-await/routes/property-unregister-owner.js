const logic = require('../logic')

module.exports = async (req, res) => {

    const { params: { propertyId, ownerId } } = req

    try {
        await logic.unregisterOwnerProperty(propertyId, ownerId)
            .then(() => res.json({ message: `Owner with id ${ownerId} unregistered from property with id ${propertyId} successfully` }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}
