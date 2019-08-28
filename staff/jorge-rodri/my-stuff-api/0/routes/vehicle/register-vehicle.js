const { vehicle } = require('../../logic')

module.exports = function (req, res) {
    const { params:{ id }, body: { brand, model, year, type, color, electric, owner=id } } = req

    try {
        vehicle.registerVehicle(brand, model, year, type, color, electric, owner)
            .then((id) => {
                res.status(201).json({ message: 'vehicle correctly registered', id })})
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}