const logic = require('../../logic/chat/retrieve-chat')

module.exports = (req, res) => {

    const { userId, params: { chatId } } = req

    try {
        logic.retrieveChat(userId, chatId)
            .then(chat => res.json({ message: 'Chat retrieved correctly', chat }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 