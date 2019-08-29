const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { id, cardId } } = req

    try {
        logic.card.unregister(id, cardId)
            .then(() => res.json({ message: 'Card unregistered successfully'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
