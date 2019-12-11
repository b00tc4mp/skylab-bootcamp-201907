
const logic = require('../../logic')

module.exports = (req, res) => {

    const { userId, params: { petId }, body } = req

    try {
         
        logic.updatePet(userId, petId, body)
            .then(() => res.json({ message: 'Pet updated successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
        } catch({ message }) {
                res.status(404).json({ error: message })
        }
}
