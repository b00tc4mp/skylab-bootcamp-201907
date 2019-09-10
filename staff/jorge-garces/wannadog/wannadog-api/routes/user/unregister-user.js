const unregisterUser = require('../../logic/user/unregister-user')

module.exports = async function (req, res) {


    const { params: { id }, body: { email, password } } = req

    try {
        await unregisterUser(id, email, password)
        res.json({ message: 'User unregistered successfully' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}