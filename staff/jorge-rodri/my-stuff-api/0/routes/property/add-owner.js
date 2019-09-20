const { property } = require('../../logic')

module.exports = function (req, res) {
    const { params: { id }, body: {owner, cadastre}  } = req

    try {
        property.addOwner(id, owner, cadastre)
            .then(() => res.json({ message: 'property correctly updated' }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}