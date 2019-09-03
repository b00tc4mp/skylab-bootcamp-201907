const { card } = require('../../logic')

module.exports = (req, res) => {
    const { params: { id, idc } } = req

    try {
        card.retrieveCard(id, idc)
            .then(card => res.json({ message: 'card retrieved correctly', card }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}