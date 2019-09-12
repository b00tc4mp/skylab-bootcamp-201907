const listAll = require('../../logic/poll/list-all')
const bcrypt = require('bcryptjs')

module.exports = (req, res) => {

    const { userId, params: { targetCityId } } = req

    try {
        listAll(userId, targetCityId)
            .then(polls => res.json({ message: 'Polls retrieved correctly', polls }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}