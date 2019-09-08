const votePoll = require('../../logic/poll/vote-poll')

module.exports = function(req, res) {
    debugger
    const { body: { vote }, params: { id, pollId } } = req

    try {
        votePoll(id, pollId, vote)
            .then(() => res.status(201).json({ message: 'Vote ok'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}