const logic = require('../../logic')

module.exports = async function (req, res) {

    const { params: { id }, body: { number, expiry } } = req

    try {
        const cardId = await logic.card.register(id, number, expiry)
        res.status(201).json({ message: 'Card registered successfully', id: cardId })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}