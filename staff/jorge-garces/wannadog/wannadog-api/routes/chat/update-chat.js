const logic = require('../../logic/chat/update-chat')

module.exports = (req, res) => {

    const { userId, params: { chatId }, body: { body } } = req

    try {
        logic.updateChat(userId, chatId, body)
            .then(() => res.json({ message: 'Chat updated successfully' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}