const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { id, cardId } } = req

    try {
        logic.card.retrieveCard(id, cardId)
            .then(card => res.json({ message: 'Card retrieved correctly', card }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }


} 
