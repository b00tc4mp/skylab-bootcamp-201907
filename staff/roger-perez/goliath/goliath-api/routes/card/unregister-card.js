const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { cardId } } = req

    try {
        logic.unregisterCard(cardId)
            .then(() => res.json({ message: 'card unregistered successfully'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
