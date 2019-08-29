const logic = require('../../logic')

module.exports = async function (req, res) {

    const { body: { make, model, year, type, color, electric, plate },
        params: { id } } = req

    try {
        const vehicleId = await logic.vehicle.register(id, make, model, year, type, color, electric, plate)
        res.status(201).json({ message: 'Vehicle registered successfully', id: vehicleId })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}