const logic = require('../../logic')

module.exports = async (req, res) => {

    const { params: { id, cardId } } = req

    try {
        await logic.card.unregister(id, cardId)
        res.json({ message: 'Card unregistered successfully' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}
