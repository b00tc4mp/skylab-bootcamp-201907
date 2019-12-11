const logic = require('../../logic')

module.exports = (req, res) => {

    const { userId, params: { petId } } = req

    try {
        logic.retrievePet(userId, petId)
            .then(pet => res.json({ message: 'Pet retrieved correctly', pet }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 