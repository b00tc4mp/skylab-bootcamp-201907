const logic = require('../../logic')

module.exports = (req, res) => {

    const { userId, body: { distance }} = req

    try {
        logic.retrieveAllDinamic(userId, distance)
            .then(dinamic => res.json({ message: 'Dinamic location retrieved correctly', dinamic }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 