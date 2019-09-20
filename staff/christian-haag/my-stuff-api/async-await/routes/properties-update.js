const logic = require('../logic')

module.exports = async (req, res) => {

    const { params: { propertyId }, body } = req

    try {
        await logic.updateProperty(propertyId, body)
            .then(() => res.json({ message: 'Property updated successfully' }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}


