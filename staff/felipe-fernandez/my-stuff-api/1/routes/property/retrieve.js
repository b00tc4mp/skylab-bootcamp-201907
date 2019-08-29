const logic = require('../../logic')

module.exports = async (req, res) => {

    const { params: { propertyId } } = req

    try {
        const property = await logic.property.retrieve(propertyId)
        res.json({ message: 'Property retrieved correctly', property })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}