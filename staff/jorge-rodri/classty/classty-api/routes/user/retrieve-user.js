const { user } = require('../../logic')

module.exports = async (req, res) => {
    const { userId } = req

    try {

        const _user = await user.retrieveUser(userId)

        res.json({ message: 'user retrieved correctly', _user })

    } catch ({ message }) {

        res.status(404).json({ error: message })
        
    }
}