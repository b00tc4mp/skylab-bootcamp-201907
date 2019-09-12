const logic = require('../../logic')

module.exports = function (req, res) {
    const { body: { name, style, audio } } = req

    try {
        logic.registerInstrument(name, style, audio)
            .then(() => res.status(201).json({ message: 'Instrument correctly registered' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}