const removeArticle = require('../../logic/cart/remove-article')

module.exports = function(req, res) {

    const { userId, body: { articleId } } = req
        
    try {
        removeArticle(userId, articleId)
            .then((() => res.status(201).json({ message: `Article with id ${articleId} removed from cart of user with id ${userId} successfully`})))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}