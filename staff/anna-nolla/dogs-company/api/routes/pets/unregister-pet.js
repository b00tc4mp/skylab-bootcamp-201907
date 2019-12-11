const logic = require('../../logic')

module.exports = (req, res) => {

    const {  userId, params: { petId } } = req
    
    try {
        logic.unregisterPet(userId, petId)
            .then(() => res.json({ message: 'Pet unregistered successfully'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}