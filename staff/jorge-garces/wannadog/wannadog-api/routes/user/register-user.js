const registerUser = require('../../logic/user/register-user')

module.exports = async function (req, res) {
    const { body: { name, surname, email, password, location: { coordinates: [longitude = 0, latitude = 0] } } } = req

    try {
        await registerUser({ name, surname, email, password, location: { coordinates: [longitude, latitude] } })
        res.status(201).json({ message: 'User registered correctly.' })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}