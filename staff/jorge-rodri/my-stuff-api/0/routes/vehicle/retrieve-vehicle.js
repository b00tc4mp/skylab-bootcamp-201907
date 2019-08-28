const { vehicle } = require('../../logic')

module.exports = (req, res) => {
    const { params: { id } } = req

    try {
        vehicle.retrieveVehicle(id)
            .then(vehicle => res.json({ message: 'vehicle retrieved correctly', vehicle }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}