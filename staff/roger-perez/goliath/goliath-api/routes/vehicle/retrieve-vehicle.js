const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { vehicleId } } = req

    try {
        logic.retrieveVehicle(vehicleId)
            .then(vehicle => res.json({ message: 'vehicle retrieved correctly', vehicle }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 

