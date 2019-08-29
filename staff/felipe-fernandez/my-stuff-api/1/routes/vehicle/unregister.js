const logic = require('../../logic')

module.exports = async (req, res) => {

    const { params: { vehicleId } } = req

    try {
        await logic.vehicle.unregister(vehicleId)
        res.json({ message: 'Vehicle unregistered successfully' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}