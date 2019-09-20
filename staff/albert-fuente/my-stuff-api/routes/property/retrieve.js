const logic = require('../../logic')

module.exports = async(req, res) => {

    const { params: { propertyId } } = req

    try {
        await logic.property.retrieve(propertyId)
            .then(property => res.json({ message: 'Property retrieved correctly', property }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 

