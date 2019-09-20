const { user } = require('../../logic')

module.exports = function (req, res) {
    const { body: { name, surname, email, password, card=[] } } = req

    try {
        user.registerUser(name, surname, email, password, card)
            .then(() => res.status(201).json({ message: 'user correctly registered' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}