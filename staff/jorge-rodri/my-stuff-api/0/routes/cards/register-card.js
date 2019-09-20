const { card } = require('../../logic')

module.exports = function (req, res) {
    const { params: { id }, body: { number, expiry } } = req
    try {
        card.registerCard(id, number, expiry)
            .then((card) => {
                res.status(201).json({ message: 'card correctly registered', card })
            })
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}