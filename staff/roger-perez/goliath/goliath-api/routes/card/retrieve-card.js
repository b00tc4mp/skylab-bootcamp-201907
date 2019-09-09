const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { cardId } } = req

    try {
        logic.retrievCard(cardId)
            .then(card => res.json({ message: 'card retrieved correctly', card }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 

