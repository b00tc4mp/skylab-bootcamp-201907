const { property } = require('../../logic')

module.exports = (req, res) => {
    const { params: { id } } = req

    try {
        property.retrieveProperty(id)
            .then(property => res.json({ message: 'property retrieved correctly', property }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}