const logic = require('../../logic')

module.exports = function(req, res) {

    const { body: { address, m2, year, cadastre }, params: { id } } = req

    try {
        logic.property.register(id, address, m2, year, cadastre)
            .then(() => res.status(201).json({ message: 'Property registered successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}