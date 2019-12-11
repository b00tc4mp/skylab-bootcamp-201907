const retrieveAllArticles = require('../../logic/article/retrieve-all-articles')

module.exports = (req, res) => {

    try {
        retrieveAllArticles()
            .then(articles => res.json({ message: 'All articles retrieved correctly', articles }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
} 