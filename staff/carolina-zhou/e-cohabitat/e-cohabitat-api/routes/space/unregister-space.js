const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { spaceId } } = req

    try {
        logic.unregisterSpace(spaceId)
            .then(() => res.json({ message: 'space unregistered successfully'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
