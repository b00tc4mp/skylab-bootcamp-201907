const searchArticles = require('../../logic/article/search-articles')

module.exports = (req, res) => {

    const { params: { q } } = req

    try {
        searchArticles(q)
            .then(articles => {
                if (articles.length === 0) throw Error(`There aren\'t articles with query ${q}`)    

                res.json({ message: `Articles with query '${q}'`,  articles })
            })
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
} 