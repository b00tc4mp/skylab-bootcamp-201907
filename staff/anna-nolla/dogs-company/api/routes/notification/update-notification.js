
const logic = require('../../logic')

module.exports = (req, res) => {

    const { userId, params: { notificationId }, body } = req

    try {
        logic.updateNotification(userId, notificationId, body)
            .then(() => res.json({ message: 'Notification updated successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
        } catch({ message }) {
                res.status(404).json({ error: message })
        }
}
