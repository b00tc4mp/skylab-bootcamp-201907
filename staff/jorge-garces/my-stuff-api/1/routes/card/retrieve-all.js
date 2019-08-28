const logic = require('../../logic')

module.exports = async (req, res) => {

    const { params: { id } } = req

    try {
        const cards = await logic.card.retrieveAll(id)
        res.json({ message: 'Cards retrieved correctly', cards })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}