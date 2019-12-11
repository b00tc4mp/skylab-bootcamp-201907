const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { commentId, taskId }, body } = req

    try {
        logic.editComment(commentId, body, taskId)
            .then(() => res.json({ message: 'comment edited successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}


