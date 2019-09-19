const logic = require('../../logic')

module.exports = (req, res) => {

    const { userId } = req

    try {
        logic.retrieveNotification(userId)
            .then(notification => res.json({ message: 'Notification retrieved correctly', notification }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 