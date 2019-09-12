const updatePoll = require('../../logic/poll/update-poll')
const bcrypt = require('bcryptjs')

module.exports = (req, res) => {

    //const { params: { pollId }, userId, body } = req
    const { params: { pollId }, userId, body } = req

    try {
        updatePoll(pollId, userId, body)
        .then(() => res.status(201).json({ message: 'Poll updated successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
        } catch({ message }) {
            res.status(404).json({ error: message })
        }
}