const logic = require('../../logic')

module.exports = async (req, res) => {

    const { params: { propertyId } } = req

    try {
        await logic.property.unregister(propertyId)
        res.json({ message: 'Property unregistered successfully' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}