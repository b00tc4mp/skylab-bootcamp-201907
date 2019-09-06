
const logic = require('../../logic')

module.exports = (req, res) => {

    const { userId, params: { chatId }, body: { text } } = req

    try {
        logic.updateChat(userId, chatId, text)
            .then(() => res.json({ message: 'Chat updated successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
        } catch({ message }) {
                res.status(404).json({ error: message })
        }
}
