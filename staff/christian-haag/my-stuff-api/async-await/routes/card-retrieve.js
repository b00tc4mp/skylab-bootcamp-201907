const logic = require('../logic')
module.exports = async (req, res) => {
    const { params: { id, cardId } } = req
    try {
        const card = await logic.retrieveCard(id, cardId)
        res.json({ message: 'Card retrieved correctly', card })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}
