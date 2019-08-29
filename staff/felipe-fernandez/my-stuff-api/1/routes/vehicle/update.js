const logic = require('../../logic')

module.exports = async (req, res) => {

    const { params: { vehicleId }, body } = req

    try {
        await logic.vehicle.update(vehicleId, body)
        res.json({ message: 'Vehicle updated successfully' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}