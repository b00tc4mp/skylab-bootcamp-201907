const { retrieveUserPosts } = require('../../logic')

module.exports = (req, res) => {
    //const { params: { id } } = req
    const { id } = req
        
    try {
        retrieveUserPosts(id)
            .then(authorPosts => res.json({ message: `posts from author ${id} retrieved correctly`, authorPosts }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}