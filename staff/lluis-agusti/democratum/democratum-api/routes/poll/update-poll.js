const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { pollId }, body } = req

    try {
        logic.updatePoll(pollId, body)
            .then(() => res.json({ message: 'Poll updated successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
        } catch({ message }) {
                res.status(404).json({ error: message })
        }
}