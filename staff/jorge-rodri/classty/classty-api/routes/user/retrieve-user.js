const { users } = require('../../logic')

module.exports = async (req, res) => {
    const { userId } = req

    try {

        const user = await users.retrieveUser(userId)

        res.json({ message: 'user retrieved correctly', user })

    } catch ({ message }) {

        res.status(404).json({ error: message })
        
    }
}