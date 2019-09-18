const votePoll = require('../../logic/poll/vote-poll')
const bcrypt = require('bcryptjs')

module.exports = async (req, res) => {

    const { params: { pollId }, userId, body: { vote } } = req

    //const { userId, params: { pollId }, vote } = req
 
    //const { params: { targetPollId }, userId, vote } = req

    try {
        await votePoll(userId, pollId, vote)
            .then(resPoll => res.status(201).json({ message: 'Thank you for your vote.', resPoll}))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}