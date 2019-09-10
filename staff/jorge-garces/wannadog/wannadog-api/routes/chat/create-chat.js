const createChat = require('../../logic/chat/create-chat')

module.exports = async function (req, res) {

    const { userId, body: { participantId } } = req

    try {

        const chatId = await createChat(userId, participantId)
        res.status(201).json({ message: 'Chat created successfully', chatId })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}