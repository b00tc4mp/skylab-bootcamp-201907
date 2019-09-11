const retrieveUser = require('../../logic/user/retrieve-user')

module.exports = async function (req, res) {

    const { userId } = req

    try {
        const user = await retrieveUser(userId)
        res.json({ message: 'user retrieved correctly', user })

    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}