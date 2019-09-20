const { card } = require('../../logic')

module.exports = function (req, res) {
    const { params: { id, idc } } = req

    try {
        card.unregisterCard(id, idc)
            .then(() => res.json({ message: 'card correctly unregistered' }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}