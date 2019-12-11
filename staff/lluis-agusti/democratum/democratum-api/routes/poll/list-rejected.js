const listRejected = require('../../logic/poll/list-rejected')
const bcrypt = require('bcryptjs')

module.exports = (req, res) => {

    const { userId, params: { targetCityId } } = req

    try {
        listRejected(userId, targetCityId, 'rejected')
            .then(polls => res.json({ message: 'Rejected polls list:', polls }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}