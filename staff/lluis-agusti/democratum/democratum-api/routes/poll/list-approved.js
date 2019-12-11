const listApproved = require('../../logic/poll/list-approved')
const bcrypt = require('bcryptjs')

module.exports = (req, res) => {

    const { userId, params: { targetCityId } } = req

    try {
        listApproved(userId, targetCityId, 'approved')
            .then(polls => res.json({ message: 'Approved polls list:', polls }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}