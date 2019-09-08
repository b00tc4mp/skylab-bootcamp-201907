const logic = require('../../logic')

module.exports = function(req, res) {

    const { body: { author, posted, text }, params: { taskId } } = req

    try {
        logic.postComment(author, posted, text, taskId)
            .then(() => res.status(201).json({ message: 'comment posted successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}