const logic = require('../../logic')

module.exports = async(req, res) => {

    const { params: { propertyId },body:{ownerId} } = req //ara agafes de params de URL nomes propertyId i del body agafes ownerId
    //a la logica no cambia res pero si a la logice de ruta.
    

    try {
        await logic.property.registerOwner(propertyId, ownerId)
                        
                res.json({ message: `Owner with id ${ownerId} registered to property ${propertyId} successfully`})

    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
