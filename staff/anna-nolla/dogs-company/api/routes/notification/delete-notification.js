const logic = require('../../logic')

module.exports = (req, res) => {

    const {  userId, params: { notificationId } } = req
    
    try {
        logic.deleteNotification(userId, notificationId)
            .then(() => res.json({ message: 'Notification deleted successfully'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}