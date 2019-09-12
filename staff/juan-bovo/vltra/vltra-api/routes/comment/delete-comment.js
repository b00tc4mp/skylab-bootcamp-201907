const { deleteComment } = require('../../logic')

module.exports = function (req, res) {
    // const { params: { id }, body: { password } } = req
    const { id, body: { postId, commentId } } = req

    try {
        debugger
        deleteComment(postId, commentId)
            .then(() => res.json({ message: `commentId with id ${commentId} has been deleted` }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}