const {addComment} = require('../../logic')

module.exports = function (req, res) {
    const { body: { postId, commentAuthor, commentBody, commentDate } } = req

    try {
        addComment(postId, commentAuthor, commentBody, commentDate)
            .then(() => res.status(201).json({ message: 'comment correctly created' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}