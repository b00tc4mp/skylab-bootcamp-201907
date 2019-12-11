const unregisterArticle = require('../../logic/article/unregister-article')

module.exports = (req, res) => {
    
    const { userId, params: { articleId }, body: { password } } = req
 
    try {
        unregisterArticle(articleId, userId, password)
            .then(() => res.json({ message: 'Article unregistered successfully'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}