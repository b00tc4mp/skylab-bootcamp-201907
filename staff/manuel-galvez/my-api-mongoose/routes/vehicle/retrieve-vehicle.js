const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { vehicleId } } = req

    try {
        logic.vehicle.retrieve(vehicleId)
            .then(vehicle => res.json({ message: 'Vehicle retrieved correctly', vehicle }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 

