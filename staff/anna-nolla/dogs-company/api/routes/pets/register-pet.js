 
const logic = require('../../logic')

module.exports = function(req, res) {

    const { userId, body: {name, age, gender, size, characteristics } } = req
     
    try {
        logic.registerPet(userId, name, age, gender, size, characteristics)
            .then((petId) => res.status(201).json({ message: 'Pet registered successfully', petId}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}