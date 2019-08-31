const logic = require('../../logic')

module.exports = function(req, res) {

    const { params: { id }, body: { number, expiry } } = req

    try {
        const expiry = '2019-08-27T17:03:54.031Z'
        const _expiry = new Date(expiry)   

        logic.card.register(id, number, _expiry)
            .then(cardId => res.status(201).json({ message: 'Card registered successfully', id: cardId}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}