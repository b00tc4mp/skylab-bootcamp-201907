const changeStatus = require('../../logic/poll/change-status')


module.exports = function(req, res) {

    const { body: { newStatus }, params: { pollId }, userId } = req

    try {
        changeStatus(userId, pollId, newStatus)
            .then(() => res.status(201).json({ message: 'pollStatus changed'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}