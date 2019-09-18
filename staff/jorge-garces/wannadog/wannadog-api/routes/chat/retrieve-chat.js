const retrieveChat = require('../../logic/chat/retrieve-chat')

module.exports = async function (req, res) {

    const { userId, params: { chatId } } = req
    debugger
    try {
        const chat = await retrieveChat(userId, chatId)
        res.json({ message: 'Chat retrieved correctly', chat })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
} 