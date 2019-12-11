const retrieveArticle = require('../../logic/article/retrieve-article')

module.exports = (req, res) => {

    const { params: { articleId } } = req

    try {
        retrieveArticle(articleId)
            .then(article => res.json({ article }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
} 