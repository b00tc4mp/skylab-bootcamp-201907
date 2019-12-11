const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { id, spaceId }, body: { passcode } } = req

    try {
        logic.unregisterSpace(id, spaceId, passcode)
            .then(() => res.json({ message: 'space unregistered successfully'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
