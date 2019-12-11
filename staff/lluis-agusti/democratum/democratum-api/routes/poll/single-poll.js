const logic = require('../../logic')

module.exports = async (req, res) => {
    const { params: { pollId } } = req
    try {
        const poll = await logic.singlePoll(pollId)
        res.json({ message: 'Poll retrieved correctly', poll })
        return poll
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}