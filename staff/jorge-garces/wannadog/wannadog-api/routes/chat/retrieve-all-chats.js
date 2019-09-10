const retrieveAllChats = require('../../logic/chat/retrieve-all-chats')

module.exports = async function (req, res) {
    debugger
    const { userId } = req

    try {
        const chat = await retrieveAllChats(userId)
        res.json({ message: 'Chats retrieved correctly', chat })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
} 