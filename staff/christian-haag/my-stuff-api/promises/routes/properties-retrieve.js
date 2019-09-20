const logic = require('../logic')

module.exports = (req, res) => {
    const { body: { cadastre } } = req

    try {
        logic.retrieveProperty(cadastre)
            .then(property => res.json({ message: 'property retrieved correctly', property }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}