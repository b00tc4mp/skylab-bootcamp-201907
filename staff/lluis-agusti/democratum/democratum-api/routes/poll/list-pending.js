const listPending = require('../../logic/poll/list-pending')
const bcrypt = require('bcryptjs')

module.exports = (req, res) => {

    const { userId, params: { targetCityId } } = req

    try {
        listPending(userId, targetCityId, 'pending')
            .then(polls => res.json({ message: 'Pending polls list:', polls }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}