const logic = require('../../logic')

module.exports = (req, res) => {

    const { userId } = req

    try {
        logic.retrieveAllChats(userId)
            .then(chat => res.json({ message: 'Chats retrieved correctly', chat }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 