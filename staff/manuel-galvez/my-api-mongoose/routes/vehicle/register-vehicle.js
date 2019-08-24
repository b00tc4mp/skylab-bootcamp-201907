const logic = require('../../logic')

module.exports = function(req, res) {

    const { body: { make, model, year, type, color, electric },
            params: { id } } = req

    try {
        logic.vehicle.register(make, model, year, type, color, electric, id)
            .then(() => res.status(201).json({ message: 'Vehicle registered successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}