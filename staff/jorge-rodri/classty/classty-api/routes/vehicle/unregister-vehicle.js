const { vehicle } = require('../../logic')

module.exports = function (req, res) {
    const { params: { id, idv } } = req

    try {
        vehicle.unregisterVehicle(idv, id)
            .then(() => res.json({ message: 'vehicle correctly unregistered' }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}