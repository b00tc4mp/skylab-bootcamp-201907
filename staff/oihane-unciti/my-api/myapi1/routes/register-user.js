const logic = require('../logic')

module.exports = function (req, res) {
    const { body: { name, surname, email, password } } = req

    try {
        logic.registerUser(name, surname, email, password)
            .then(() => res.status(201).json({ message: 'user correctly registered' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}