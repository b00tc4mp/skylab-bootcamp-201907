const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { vehicleId } } = req

    try {
        logic.unregisterVehicle(vehicleId)
            .then(() => res.json({ message: 'vehicle unregistered successfully'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
