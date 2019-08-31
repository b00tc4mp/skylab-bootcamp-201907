const logic = require('../../logic')

module.exports = async(req, res)=> {

    const { body: { address, m2, year, cadastre }, params: { id } } = req

    try {
        await logic.property.register(id, address, m2, year, cadastre)
            .then((propertyId) => res.status(201).json({ message: 'Property registered successfully',propertyId}))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}