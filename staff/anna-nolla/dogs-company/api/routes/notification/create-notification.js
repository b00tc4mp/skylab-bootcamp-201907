 
const logic = require('../../logic')

module.exports = function(req, res) {

    const { userId, body: {title, text } } = req
    
    try {
        logic.createNotification(userId, title, text)
            .then((notificationId) => res.status(201).json({ message: 'Notification created successfully', notificationId }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}