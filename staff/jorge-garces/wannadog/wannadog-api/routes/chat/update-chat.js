const updateChat = require('../../logic/chat/update-chat')

module.exports = async function (req, res) {

    const { userId, params: { chatId }, body: { _message } } = req
    debugger
    try {
        await updateChat(userId, chatId, _message)
        res.json({ message: 'Chat updated successfully' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}