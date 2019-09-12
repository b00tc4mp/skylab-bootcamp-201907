const listExpired = require('../../logic/poll/list-expired')
const bcrypt = require('bcryptjs')

module.exports = (req, res) => {

    const { userId, params: { targetCityId } } = req

    try {
        listExpired(userId, targetCityId, 'expired')
            .then(polls => res.json({ message: 'Expired polls list:', polls }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}