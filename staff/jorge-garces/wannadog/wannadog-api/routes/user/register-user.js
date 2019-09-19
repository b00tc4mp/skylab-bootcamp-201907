const registerUser = require('../../logic/user/register-user')

module.exports = async function (req, res) {
    const { body: { name, surname, email, password } } = req

    try {
        await registerUser({ name, surname, email, password })
        res.status(201).json({ message: 'User registered correctly.' })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}