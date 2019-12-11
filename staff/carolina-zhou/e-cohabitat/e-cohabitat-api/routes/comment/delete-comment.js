const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { id, taskId, commentId } } = req

    try {
        logic.deleteComment(id, taskId, commentId)
            .then(() => res.json({ message: 'comment deleted successfully'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
