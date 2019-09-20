const logic = require('../logic')

module.exports = async (req, res) => {

    const { params: { propertyId }, body: { ownerId } } = req

    try {
        await logic.registerOwnerProperty(propertyId, ownerId)

        res.json({ message: `Owner with id ${ownerId} registered to property ${propertyId} successfully` })

    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}
