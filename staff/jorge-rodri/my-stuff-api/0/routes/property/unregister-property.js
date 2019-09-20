const { property } = require('../../logic')

module.exports = function (req, res) {
    const { params: { id, idp }, body: {cadastre} } = req

    try {
        property.unregisterProperty(id, idp, cadastre)
            .then(() => res.json({ message: 'property correctly unregistered' }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}