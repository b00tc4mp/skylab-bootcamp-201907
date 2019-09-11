const logic = require('../../logic')

module.exports = function (req, res) {
    const { body: { name, surname,instrument,description, email, password } } = req

    try {
        logic.registerUser(name, surname,instrument,description, email, password)
            .then(() => res.status(201).json({ message: 'user correctly registered' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}