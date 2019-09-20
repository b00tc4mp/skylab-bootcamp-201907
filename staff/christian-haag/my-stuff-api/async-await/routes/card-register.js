const logic = require('../logic')

module.exports = function (req, res) {
    const { params: { id }, body: { cardBrand, cardType, number, expiry } } = req
    try {
        logic.registerCard(id, cardBrand, cardType, number, expiry)
            .then(() => res.status(201).json({ message: 'card correctly added' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}