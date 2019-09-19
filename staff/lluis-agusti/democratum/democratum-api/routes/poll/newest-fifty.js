const newestFifty = require('../../logic/poll/newest-fifty')
const bcrypt = require('bcryptjs')

module.exports = (req, res) => {

    const { userId } = req

    try {
        newestFifty(userId, 'approved')
            .then(polls => res.json({ message: 'Global newest fifty polls:', polls }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}