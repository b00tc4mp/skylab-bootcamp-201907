const logic = require('../../logic')

module.exports = function (req, res) {
    const { body: { brand, model, year, type, color, electric, plate } } = req
    const { params: { id } } = req

    try {
        logic.vehicle.register(id, brand, model, year, type, color, electric, plate)
            .then(vehicleId => res.status(201).json({ message: 'vehicle registered successfully', id: vehicleId }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}