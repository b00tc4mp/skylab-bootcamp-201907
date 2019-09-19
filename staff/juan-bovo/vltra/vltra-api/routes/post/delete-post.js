const { deletePost } = require('../../logic')

module.exports = function (req, res) {
    // const { params: { id }, body: { password } } = req
    const { id, body: { postId } } = req

    try {
        deletePost(id, postId)
            .then(() => res.json({ message: `postId with id ${postId} has been deleted` }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}