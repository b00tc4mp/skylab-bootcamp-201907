const retrieveCategory = require('../../logic/article/retrieve-category')

module.exports = (req, res) => {

    const { params: { category } } = req

    try {
        retrieveCategory(category)
            .then(articles => res.json({ message: `Category '${category}' retrieved correctly`, articles }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
} 