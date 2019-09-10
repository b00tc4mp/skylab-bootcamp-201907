const updateChat = require('../../logic/chat/update-chat')

module.exports = async function (req, res) {

    const { userId, params: { chatId }, body: { body } } = req

    try {
        await updateChat(userId, chatId, body)
        res.json({ message: 'Chat updated successfully' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}