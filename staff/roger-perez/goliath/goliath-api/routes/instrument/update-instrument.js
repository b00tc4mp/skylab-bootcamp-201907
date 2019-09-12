const logic = require('../../logic')

module.exports = function (req, res) {
    const { params: { id }, body  } = req

    try {
        logic.updateInstrument(id, body)
            .then(() => res.json({ message: 'instrument correctly updated' }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}