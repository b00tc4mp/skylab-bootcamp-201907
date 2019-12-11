const logic = require('../../logic')

module.exports = (req, res) => {

    const { userId } = req

    try {
        logic.retrieveAllPets(userId)
            .then(pet => res.json({ message: 'Pets retrieved correctly', pet }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 