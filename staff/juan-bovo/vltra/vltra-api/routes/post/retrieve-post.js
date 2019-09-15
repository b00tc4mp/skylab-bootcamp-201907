const {retrievePost} = require('../../logic')

module.exports = (req, res) => {
    //const { params: { id } } = req
    // const { id, body: { postId } } = req
    const { id, params: { postId } } = req
    
    try {
        retrievePost(postId)
            .then(post => res.json({ message: 'post retrieved correctly', post }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}