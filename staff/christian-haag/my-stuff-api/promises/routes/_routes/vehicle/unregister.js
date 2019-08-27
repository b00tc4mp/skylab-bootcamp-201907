const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { vehicleId } } = req

    try {
        logic.vehicle.unregister(vehicleId)
            .then(() => res.json({ message: 'Vehicle unregistered successfully'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
