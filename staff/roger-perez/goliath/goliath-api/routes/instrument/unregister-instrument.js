const logic = require('../../logic')

module.exports = function (req, res) {
    const { params: { id } } = req

    try {
        logic.unregisterInstrument(id)
            .then(() => res.json({ message: 'instrument correctly unregistered' }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}