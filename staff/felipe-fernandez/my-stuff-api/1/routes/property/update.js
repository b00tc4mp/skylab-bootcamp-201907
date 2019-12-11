const logic = require('../../logic')

module.exports = async (req, res) => {

    const { params: { propertyId }, body } = req

    try {
        await logic.property.update(propertyId, body)
        res.json({ message: 'Property updated successfully' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}