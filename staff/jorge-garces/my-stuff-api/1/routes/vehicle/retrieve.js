const logic = require('../../logic')

module.exports = async (req, res) => {

    const { params: { vehicleId } } = req

    try {
        const vehicle = await logic.vehicle.retrieve(vehicleId)
        res.json({ message: 'Vehicle retrieved correctly', vehicle })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}