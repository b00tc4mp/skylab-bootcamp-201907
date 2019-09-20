const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { id } } = req

    try {
        logic.card.retrieveAllCard(id)
            .then(vehicles => res.json({ message: 'Cards retrieved correctly', vehicles }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 

