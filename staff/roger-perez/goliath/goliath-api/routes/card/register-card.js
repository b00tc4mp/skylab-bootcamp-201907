const logic = require('../../logic')

module.exports = function(req, res) {

    const { params: { id }, body: { number, expiration } } = req

    try {
        logic.registerCard(id, number, expiration)
            .then(cardId => res.status(201).json({ message: 'card registered successfully', id: cardId}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}