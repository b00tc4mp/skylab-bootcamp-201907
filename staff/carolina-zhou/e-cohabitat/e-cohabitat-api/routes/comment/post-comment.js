const logic = require('../../logic')

module.exports = function(req, res) {

    const { body: { author, posted, text }, params: { id, taskId } } = req

    try {
        const _posted = new Date(posted)
        logic.postComment(id, author, _posted, text, taskId)
            .then(() => res.status(201).json({ message: 'comment posted successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}