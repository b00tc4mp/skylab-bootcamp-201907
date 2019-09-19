const registerUser = require('../../logic/user/register-user')

module.exports = function (req, res) {
    const { userId, body: { company, country, email, password, role } } = req 

    try {
        registerUser(userId, company, country, email, password, role)
            .then(user => res.status(201).json({ message: 'user correctly registered', user }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}