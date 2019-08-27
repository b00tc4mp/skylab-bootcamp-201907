const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { id } } = req

    try {
        logic.card.retrieveAll(id)
            .then(cards => res.json({ message: 'Cards retrieved correctly', cards }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 

