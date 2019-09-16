const { retrieveUserPosts } = require('../../logic')

module.exports = (req, res) => {
    //const { params: { id } } = req
    const { id, params: { authorId } } = req
        
    try {
        retrieveUserPosts(authorId)
            .then(authorPosts => res.json({ message: `posts from author ${authorId} retrieved correctly`, authorPosts }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}