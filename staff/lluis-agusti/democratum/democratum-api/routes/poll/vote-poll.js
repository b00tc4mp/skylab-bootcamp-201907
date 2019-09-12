const votePoll = require('../../logic/poll/vote-poll')
const bcrypt = require('bcryptjs')

module.exports = (req, res) => {

    // const { body: { vote }, params: { pollId }, userId } = req

    const { params: { targetPollId }, userId, vote } = req

    try {
        votePoll(targetPollId, userId, vote)
            .then(() => res.status(201).json({ message: 'Thank you for your vote.'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}