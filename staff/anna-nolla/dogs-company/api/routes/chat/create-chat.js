 
const logic = require('../../logic')

module.exports = function(req, res) {

    const { userId, body: { participantId } } = req
    
    try {
        logic.createChat(userId, participantId)
            .then((chatId) => res.status(201).json({ message: 'Chat created successfully', chatId}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}