const {votePost} = require('../../logic')

module.exports = function (req, res) {
    const { body: { postId, userVote, userId } } = req

    try {
        votePost(postId, userVote, userId)
            .then(() => res.status(201).json({ message: 'post correctly voted' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}