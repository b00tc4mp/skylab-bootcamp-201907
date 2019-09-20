const logic = require('../../logic')

module.exports = async (req, res) => {

    const { params: { id } } = req

    try {
        const vehicles = await logic.vehicle.retrieveAll(id)
        res.json({ message: 'Vehicles retrieved correctly', vehicles })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}