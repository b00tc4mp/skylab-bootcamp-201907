const { toggleBookmark } = require('../../logic')

module.exports = function (req, res) {
    // const { params: { id }, body  } = req
    const { id, body: { postId } } = req
    
    try {
        toggleBookmark(id, postId)
            .then(() => res.json({ message: 'bookmark correctly toggled' }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}