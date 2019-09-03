const logic = require('../../logic')

module.exports = async function (req, res) {

    const { body: { username, email, password } } = req

    try {
        await logic.user.register(username, email, password)
        res.status(201).json({ message: 'User registered successfully' })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}