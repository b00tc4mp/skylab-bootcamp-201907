const { retrievePostComments } = require('../../logic')

module.exports = (req, res) => {
    //const { params: { id } } = req
    const { id, params: { postId } } = req
    
    try {
        retrievePostComments(postId)
            .then(postComments => res.json({ message: `comments from post ${postId} retrieved correctly`, postComments }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}