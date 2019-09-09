const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { vehicleId }, body } = req

    try {
        logic.updateVehicle(vehicleId, body)
            .then(() => res.json({ message: 'vehicle updated successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
        } catch({ message }) {
                res.status(404).json({ error: message })
        }
}


