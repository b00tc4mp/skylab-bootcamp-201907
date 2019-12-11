const {votePost} = require('../../logic')

module.exports = function (req, res) {
    
    const { id, body: { postId, userVote } } = req
    
    try {
        votePost(id, postId, userVote)
            .then(() => res.status(201).json({ message: 'post correctly voted' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}