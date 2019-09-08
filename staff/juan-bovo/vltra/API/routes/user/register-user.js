const {registerUser} = require('../../logic')

module.exports = function (req, res) {
    const { body: { name, surname, nickname, email, password, bookmarks, voted } } = req

    try {
        registerUser(name, surname, nickname, email, password, bookmarks, voted)
            .then(() => res.status(201).json({ message: 'user correctly registered' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}