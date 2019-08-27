const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { cardId } } = req

    try {
        logic.card.unregister(cardId)
            .then(() => res.json({ message: 'Card unregistered successfully'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
