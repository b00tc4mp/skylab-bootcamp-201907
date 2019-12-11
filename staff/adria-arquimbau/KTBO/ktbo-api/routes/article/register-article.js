const registerArticle = require('../../logic/article/register-article')

module.exports = function(req, res) {

    const { body: { ref, title, description, img, quantity, category, price },
            userId } = req

    try {
        registerArticle(userId, ref, title, description, img, quantity, category, price )
            .then(articleId => res.status(201).json({ message: 'Article registered successfully', id: articleId }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}