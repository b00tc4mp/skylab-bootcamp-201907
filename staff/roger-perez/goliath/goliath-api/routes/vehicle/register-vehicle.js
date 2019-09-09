const logic = require('../../logic')

module.exports = function(req, res) {

    const { body: { brand, model, year, type, color, electric, plate },
            params: { id } } = req

    try {
        logic.registerVehicle(brand, model, year, type, color, electric, plate, id )
            .then(vehicleId => res.status(201).json({ message: 'vehicle registered successfully', id: vehicleId }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}