const logic = require('../logic')

module.exports = function (req, res) {
    const { userId, params: { id : adId} } = req

    try {
        logic.deleteAd(userId, adId)
            .then(() => res.json({ message: 'ad correctly unregistered' }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}