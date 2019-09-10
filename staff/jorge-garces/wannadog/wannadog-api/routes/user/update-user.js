const updateUser = require('../../logic/user/update-user')

module.exports = async function (req, res) {

    const { userId, body } = req

    try {
        await updateUser(userId, body)
        res.json({ message: 'User updated successfully' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}