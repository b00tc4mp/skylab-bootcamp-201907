const {retrieveAllPosts } = require('../../logic')

module.exports = (req, res) => {
    //const { params: { id } } = req
    const { id } = req
    
    try {
        retrieveAllPosts()
            .then(posts => res.json({ message: 'posts retrieved correctly', posts }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}